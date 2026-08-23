import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  Compass,
  Menu,
  Phone,
  Play,
  Quote,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

/* QUICK CUSTOMIZATION: replace the brand, project, and contact values below. */
const BRAND = {
  name: 'Verdant Crest Developers',
  short: 'Verdant Crest',
  phone: '+91 80 4682 1100',
  whatsapp: '918046821100',
  email: 'hello@verdantcrest.in',
  address: '12, Primrose Road, Bengaluru 560025',
};

const projects = [
  {
    id: '01',
    name: 'The Canopy',
    area: 'Whitefield, East Bengaluru',
    type: '18 private residences',
    detail: '3 & 4 bedroom courtyard homes',
    status: 'Now welcoming enquiries',
    image: '/hero-estate.jpg',
  },
  {
    id: '02',
    name: 'Avara House',
    area: 'Devanahalli, North Bengaluru',
    type: '32 garden residences',
    detail: '4 bedroom homes with private gardens',
    status: 'Coming soon · Q3 2025',
    image: '/house-courtyard.jpg',
  },
  {
    id: '03',
    name: 'Mossvale',
    area: 'Sarjapur, South Bengaluru',
    type: '24 quiet residences',
    detail: '3 bedroom homes beside a rain garden',
    status: 'Private preview',
    image: '/garden-living.jpg',
  },
];

type EnquiryFormProps = {
  selectedProject?: string;
  onClose: () => void;
};

function EnquiryModal({ selectedProject, onClose }: EnquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [project, setProject] = useState(selectedProject || 'The Canopy');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-[rgba(14,34,27,.65)] p-0 sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-label="Register your interest" data-testid="dialog-enquiry">
      <div className="relative w-full max-w-xl overflow-hidden bg-[#f3eee3] shadow-2xl sm:rounded-sm">
        <button type="button" onClick={onClose} className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#d2c8b5] text-[#183b2d] transition hover:bg-[#e3dac9]" aria-label="Close enquiry form" data-testid="button-close-enquiry">
          <X size={17} />
        </button>
        {!submitted ? (
          <div className="p-7 pt-9 sm:p-12">
            <p className="eyebrow text-[#d36c50]">Begin a conversation</p>
            <h2 className="font-display mt-4 text-5xl leading-[.95] text-[#183b2d] sm:text-6xl">Come see what quiet feels like.</h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-[#597066]">Leave your details and our experience team will share the private preview, plans and a time to visit.</p>
            <form onSubmit={submit} className="mt-8 space-y-4">
              <label className="block">
                <span className="eyebrow mb-2 block text-[#597066]">Your name</span>
                <input required value={name} onChange={(event) => setName(event.target.value)} className="h-12 w-full border-b border-[#bfb6a4] bg-transparent px-0 text-[#183b2d] outline-none transition focus:border-[#d36c50]" placeholder="Name" data-testid="input-enquiry-name" />
              </label>
              <label className="block">
                <span className="eyebrow mb-2 block text-[#597066]">Mobile number</span>
                <input required value={phone} onChange={(event) => setPhone(event.target.value)} className="h-12 w-full border-b border-[#bfb6a4] bg-transparent px-0 text-[#183b2d] outline-none transition focus:border-[#d36c50]" placeholder="+91" type="tel" data-testid="input-enquiry-phone" />
              </label>
              <label className="block">
                <span className="eyebrow mb-2 block text-[#597066]">I am curious about</span>
                <select value={project} onChange={(event) => setProject(event.target.value)} className="h-12 w-full border-b border-[#bfb6a4] bg-transparent text-[#183b2d] outline-none" data-testid="select-enquiry-project">
                  {projects.map((item) => <option key={item.name}>{item.name}</option>)}
                  <option>Something else</option>
                </select>
              </label>
              <button type="submit" className="mt-4 flex h-14 w-full items-center justify-between bg-[#d36c50] px-5 text-left text-sm font-bold uppercase tracking-[.12em] text-[#183b2d] transition hover:bg-[#e18266]" data-testid="button-submit-enquiry">
                Send my details <ArrowUpRight size={18} />
              </button>
            </form>
            <p className="mt-4 text-[11px] text-[#789087]">By enquiring, you agree to hear from Verdant Crest. No noise, promise.</p>
          </div>
        ) : (
          <div className="flex min-h-[490px] flex-col justify-between bg-[#183b2d] p-8 text-[#f3eee3] sm:p-12">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#aebba6]/30 text-[#d36c50]"><Check size={22} /></div>
              <p className="eyebrow mt-10 text-[#d36c50]">Details received</p>
              <h2 className="font-display mt-4 max-w-md text-6xl leading-[.93]">You’re on the list.</h2>
              <p className="mt-5 max-w-sm text-sm leading-6 text-[#c4d0c2]">Thank you, {name || 'there'}. A member of our team will call you shortly about {project}.</p>
            </div>
            <button type="button" onClick={onClose} className="flex items-center gap-2 text-sm font-bold uppercase tracking-[.12em] text-[#d36c50]" data-testid="button-close-confirmation">Return to the garden <ChevronRight size={16} /></button>
          </div>
        )}
      </div>
    </div>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className={`group flex items-center gap-3 ${light ? 'text-[#f3eee3]' : 'text-[#183b2d]'}`} data-testid="link-brand-home">
      <span className="relative flex h-10 w-10 items-center justify-center border border-current/50 text-[11px] font-bold tracking-[-.08em]">
        <span className="absolute -right-1 -top-1 h-2 w-2 bg-[#d36c50]" />
        VC
      </span>
      <span className="hidden text-[11px] font-bold uppercase leading-4 tracking-[.19em] sm:block">Verdant Crest<br /><span className="font-normal opacity-60">Developers</span></span>
    </a>
  );
}

function SectionLabel({ number, children, light = false }: { number: string; children: ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${light ? 'text-[#b5c9b4]' : 'text-[#6f8175]'}`}>
      <span className="font-mono text-[10px]">{number}</span>
      <span className="h-px w-8 bg-current opacity-50" />
      <span className="eyebrow">{children}</span>
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>();
  const [showStory, setShowStory] = useState(false);

  const openEnquiry = (project?: string) => {
    setSelectedProject(project);
    setShowEnquiry(true);
    setMenuOpen(false);
  };

  const navItems = [
    ['Projects', '#projects'],
    ['Our approach', '#approach'],
    ['The neighbourhood', '#neighbourhood'],
    ['Contact', '#contact'],
  ];

  return (
    <div className="site-shell noise min-h-[100dvh]" id="top">
      <header className="absolute left-0 right-0 top-0 z-40 px-5 py-5 text-[#f3eee3] sm:px-10 sm:py-7">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between">
          <Logo light />
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            {navItems.map(([label, href]) => <a key={href} href={href} className="text-[11px] font-bold uppercase tracking-[.14em] opacity-75 transition hover:opacity-100" data-testid={`link-nav-${label.toLowerCase().replace(/\s+/g, '-')}`}>{label}</a>)}
          </nav>
          <div className="flex items-center gap-4">
            <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`} className="hidden items-center gap-2 text-[11px] font-bold uppercase tracking-[.12em] sm:flex" data-testid="link-header-phone"><Phone size={14} /> {BRAND.phone}</a>
            <button type="button" onClick={() => openEnquiry()} className="hidden border border-[#d5dfd0]/40 px-4 py-3 text-[10px] font-bold uppercase tracking-[.14em] transition hover:bg-[#f3eee3] hover:text-[#183b2d] sm:block" data-testid="button-header-enquiry">Arrange a visit</button>
            <button type="button" onClick={() => setMenuOpen((value) => !value)} className="flex h-10 w-10 items-center justify-center border border-[#d5dfd0]/40 lg:hidden" aria-label="Toggle menu" data-testid="button-mobile-menu">{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
          </div>
        </div>
        {menuOpen && <div className="mt-5 border-t border-[#d5dfd0]/25 bg-[#183b2d]/95 p-5 backdrop-blur-md lg:hidden">
          <div className="flex flex-col gap-5">{navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="text-sm font-bold uppercase tracking-[.13em]" data-testid={`link-mobile-${label.toLowerCase().replace(/\s+/g, '-')}`}>{label}</a>)}</div>
          <button type="button" onClick={() => openEnquiry()} className="mt-6 flex w-full items-center justify-between bg-[#d36c50] px-4 py-4 text-xs font-bold uppercase tracking-[.14em] text-[#183b2d]" data-testid="button-mobile-enquiry">Arrange a private visit <ArrowUpRight size={16} /></button>
        </div>}
      </header>

      <main>
        <section className="relative flex min-h-[720px] items-end overflow-hidden bg-[#183b2d] sm:min-h-[820px]" aria-label="Verdant Crest introduction">
          <img src="/hero-estate.jpg" alt="Verdant Crest courtyard estate among mature rain trees" className="absolute inset-0 h-full w-full object-cover object-[62%_center] opacity-90" data-testid="img-hero-estate" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,34,27,.86)_0%,rgba(14,34,27,.48)_46%,rgba(14,34,27,.1)_100%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#183b2d]/75 to-transparent" />
          <div className="relative mx-auto w-full max-w-[1440px] px-5 pb-16 pt-44 sm:px-10 sm:pb-24">
            <div className="max-w-3xl text-[#f3eee3]">
              <div className="reveal flex items-center gap-3 text-[#d4e0d0]"><span className="h-px w-10 bg-[#d36c50]" /><span className="eyebrow">Bengaluru · India</span></div>
              <h1 className="reveal reveal-delay-1 font-display mt-7 text-[clamp(4.3rem,11vw,10.5rem)] leading-[.78] tracking-[-.045em]">Make room<br /><em className="text-[#d36c50]">for living.</em></h1>
              <p className="reveal reveal-delay-2 mt-9 max-w-md text-base leading-7 text-[#d5ded1] sm:text-lg">Nature-led homes for a slower, richer way to be in Bengaluru. Designed around light, air and the life between the walls.</p>
              <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-5">
                <button type="button" onClick={() => openEnquiry()} className="group flex items-center gap-8 bg-[#d36c50] px-5 py-4 text-[11px] font-bold uppercase tracking-[.13em] text-[#183b2d] transition hover:bg-[#ed9275]" data-testid="button-hero-enquiry">Explore a private home <ArrowUpRight size={17} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
                <a href="#projects" className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.13em] text-[#e0e7db] transition hover:text-[#d36c50]" data-testid="link-hero-projects">View the collection <ArrowDown size={15} /></a>
              </div>
            </div>
            <div className="mt-16 flex max-w-2xl border-t border-[#d5dfd0]/30 pt-5 text-[#d5dfd0] sm:mt-24">
              <div className="w-1/3 border-r border-[#d5dfd0]/20"><p className="font-display text-3xl sm:text-4xl">03</p><p className="eyebrow mt-2 opacity-60">distinct addresses</p></div>
              <div className="w-1/3 border-r border-[#d5dfd0]/20 pl-5 sm:pl-8"><p className="font-display text-3xl sm:text-4xl">18</p><p className="eyebrow mt-2 opacity-60">private homes</p></div>
              <div className="w-1/3 pl-5 sm:pl-8"><p className="font-display text-3xl sm:text-4xl">01</p><p className="eyebrow mt-2 opacity-60">unhurried life</p></div>
            </div>
          </div>
          <div className="absolute bottom-8 right-8 hidden items-center gap-3 text-[#d5dfd0] lg:flex"><span className="eyebrow">Scroll to wander</span><span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d5dfd0]/40"><ArrowDown size={14} /></span></div>
        </section>

        <section className="bg-[#183b2d] px-5 py-24 text-[#f3eee3] sm:px-10 sm:py-36" id="approach">
          <div className="mx-auto grid max-w-[1200px] gap-16 lg:grid-cols-[.72fr_1.6fr] lg:gap-24">
            <SectionLabel number="01" light>Our point of view</SectionLabel>
            <div>
              <p className="font-display text-[clamp(2.8rem,6vw,6.6rem)] leading-[.9] tracking-[-.03em]">The city gives you momentum.<br /><em className="text-[#d36c50]">Home should give you back yourself.</em></p>
              <div className="mt-14 grid gap-8 border-t border-[#d5dfd0]/20 pt-7 sm:grid-cols-2">
                <p className="max-w-sm text-sm leading-7 text-[#b9c8b7]">We build deliberately small, deeply considered communities in the places Bengaluru is growing towards. Not towers that reach for attention. Addresses that reward attention.</p>
                <p className="max-w-sm text-sm leading-7 text-[#b9c8b7]">Every Verdant Crest home is shaped by its garden, its light and its climate — a contemporary expression of the city’s enduring garden character.</p>
              </div>
              <a href="#contact" className="mt-9 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.14em] text-[#d36c50] transition hover:gap-5" data-testid="link-approach-contact">Meet the people behind the homes <ArrowRightIcon /></a>
            </div>
          </div>
        </section>

        <section className="bg-[#f3eee3] px-5 py-24 sm:px-10 sm:py-36" id="projects">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div><SectionLabel number="02">The collection</SectionLabel><h2 className="font-display mt-5 max-w-xl text-6xl leading-[.88] tracking-[-.035em] text-[#183b2d] sm:text-8xl">Addresses with a <em className="text-[#b85f47]">point of view.</em></h2></div>
              <p className="max-w-xs text-sm leading-6 text-[#597066] sm:pb-1">Three distinct expressions of considered living, each rooted in its part of Bengaluru.</p>
            </div>
            <div className="mt-16 grid gap-5 lg:grid-cols-[1.16fr_.84fr]">
              {projects.map((project, index) => (
                <article key={project.id} className={`project-card group relative overflow-hidden bg-[#183b2d] ${index === 0 ? 'min-h-[570px] lg:row-span-2 lg:min-h-[740px]' : 'min-h-[355px]'}`} data-testid={`card-project-${project.id}`}>
                  <img src={project.image} alt={`${project.name}, ${project.detail}`} className="absolute inset-0 h-full w-full object-cover" data-testid={`img-project-${project.id}`} />
                  <div className="image-overlay absolute inset-0" />
                  <div className="relative flex h-full min-h-inherit flex-col justify-between p-6 text-[#f3eee3] sm:p-8">
                    <div className="flex items-start justify-between"><span className="font-mono text-xs text-[#e3e9de]/80">{project.id}</span><span className="border border-[#e3e9de]/30 px-3 py-2 text-[9px] uppercase tracking-[.14em]">{project.status}</span></div>
                    <div><p className="eyebrow text-[#d36c50]">{project.area}</p><h3 className="font-display mt-3 text-6xl leading-[.83] sm:text-7xl">{project.name}</h3><p className="mt-4 text-sm text-[#d5dfd2]">{project.type} <span className="mx-2 opacity-40">/</span> {project.detail}</p><button type="button" onClick={() => openEnquiry(project.name)} className="mt-7 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.13em] text-[#d36c50] transition hover:gap-5" data-testid={`button-project-enquiry-${project.id}`}>Request the brief <ArrowUpRight size={16} /></button></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#e4dccb] px-5 py-24 sm:px-10 sm:py-36">
          <div className="mx-auto max-w-[1200px]">
            <SectionLabel number="03">A considered standard</SectionLabel>
            <div className="mt-5 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-28">
              <h2 className="font-display max-w-lg text-6xl leading-[.88] tracking-[-.03em] text-[#183b2d] sm:text-8xl">Good design is felt <em className="text-[#b85f47]">before</em> it is noticed.</h2>
              <div className="grid gap-0 border-t border-[#183b2d]/20">
                {[
                  ['01', 'Climate first', 'Deep overhangs, cross ventilation and shaded gardens. The original Bengaluru luxuries, brought forward.'],
                  ['02', 'Material honesty', 'Hand-finished lime, warm stone, timber and brass. Materials that gather a patina, not a timestamp.'],
                  ['03', 'Room to breathe', 'Low densities, generous thresholds and landscapes that make the space between rooms matter.'],
                  ['04', 'Close to your orbit', 'Well-connected addresses, quietly set back. Easy access to the city without living at its volume.'],
                ].map(([number, title, copy]) => <div key={number} className="grid grid-cols-[42px_1fr] gap-5 border-b border-[#183b2d]/20 py-7 sm:grid-cols-[62px_1fr] sm:gap-8"><span className="font-mono text-[10px] text-[#b85f47]">{number}</span><div><h3 className="text-lg font-bold text-[#183b2d]">{title}</h3><p className="mt-2 max-w-lg text-sm leading-6 text-[#597066]">{copy}</p></div></div>)}
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute -bottom-24 -right-20 hidden h-64 w-64 rounded-full border border-[#183b2d]/10 sm:block" />
        </section>

        <section className="bg-[#f3eee3] px-5 py-24 sm:px-10 sm:py-36">
          <div className="mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-24">
            <div className="relative aspect-[.92] overflow-hidden bg-[#c4b69d]">
              <img src="/house-courtyard.jpg" alt="Stone and timber courtyard at a Verdant Crest residence" className="h-full w-full object-cover" data-testid="img-material-courtyard" />
              <div className="absolute bottom-5 left-5 bg-[#f3eee3] px-4 py-3"><p className="eyebrow text-[#597066]">Material study · 04</p><p className="mt-1 font-display text-xl text-[#183b2d]">Laterite / lime / light</p></div>
            </div>
            <div>
              <SectionLabel number="04">The verdant life</SectionLabel>
              <h2 className="font-display mt-5 text-6xl leading-[.87] tracking-[-.035em] text-[#183b2d] sm:text-8xl">A home that <em className="text-[#b85f47]">holds</em> your day.</h2>
              <p className="mt-8 max-w-md text-base leading-7 text-[#597066]">Morning light through a leaf canopy. A cool floor under bare feet. The first rain on red earth. We design for the small, sensory rituals that turn a beautiful house into your place.</p>
              <button type="button" onClick={() => setShowStory(true)} className="mt-9 flex items-center gap-4 text-[11px] font-bold uppercase tracking-[.14em] text-[#183b2d]" data-testid="button-play-story"><span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#183b2d] transition hover:bg-[#183b2d] hover:text-[#f3eee3]"><Play size={15} fill="currentColor" /></span> Watch the 60-second story</button>
            </div>
          </div>
        </section>

        <section className="bg-[#d7e0d3] px-5 py-24 sm:px-10 sm:py-32" id="neighbourhood">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
              <div><SectionLabel number="05">The neighbourhood</SectionLabel><h2 className="font-display mt-5 text-6xl leading-[.87] text-[#183b2d] sm:text-8xl">The city,<br /><em className="text-[#b85f47]">edited.</em></h2><p className="mt-7 max-w-xs text-sm leading-6 text-[#597066]">Settle into the quieter edge of the city without stepping away from the places that keep you moving.</p></div>
              <div className="relative min-h-[430px] overflow-hidden border border-[#183b2d]/15 bg-[#c7d3c4] p-5 sm:p-10">
                <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(rgba(24,59,45,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(24,59,45,.15) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
                <div className="relative h-full min-h-[375px]">
                  <div className="absolute left-[14%] top-[28%] h-3 w-3 rounded-full bg-[#d36c50] ring-8 ring-[#d36c50]/15" /><span className="absolute left-[14%] top-[35%] text-[10px] font-bold uppercase tracking-[.13em] text-[#183b2d]">The Canopy</span>
                  <div className="absolute right-[17%] top-[16%] h-3 w-3 rounded-full border-2 border-[#183b2d] bg-[#d7e0d3]" /><span className="absolute right-[9%] top-[23%] text-[10px] uppercase tracking-[.13em] text-[#597066]">Airport · 32 min</span>
                  <div className="absolute bottom-[23%] left-[36%] h-3 w-3 rounded-full border-2 border-[#183b2d] bg-[#d7e0d3]" /><span className="absolute bottom-[15%] left-[29%] text-[10px] uppercase tracking-[.13em] text-[#597066]">CBD · 28 min</span>
                  <svg viewBox="0 0 600 375" className="absolute inset-0 h-full w-full" aria-hidden="true"><path d="M80 112 C180 60 245 160 340 133 S470 80 540 65 M80 112 C190 178 250 95 360 240 S480 280 520 315" fill="none" stroke="#183b2d" strokeDasharray="5 9" strokeOpacity=".45" strokeWidth="1.5" /><path d="M70 280 C175 215 265 285 355 230 S475 200 550 130" fill="none" stroke="#b85f47" strokeOpacity=".5" strokeWidth="1" /></svg>
                  <div className="absolute bottom-3 right-3 flex items-center gap-2 text-[10px] uppercase tracking-[.12em] text-[#597066]"><Compass size={14} /> East Bengaluru · 2025</div>
                </div>
              </div>
            </div>
            <div className="mt-14 grid gap-4 sm:grid-cols-3">
              {[
                ['12 min', 'to Whitefield tech parks'],
                ['18 min', 'to Indiranagar evenings'],
                ['32 min', 'to Kempegowda Airport'],
              ].map(([time, place]) => <div key={place} className="border-t border-[#183b2d]/25 pt-4"><p className="font-display text-4xl text-[#183b2d]">{time}</p><p className="mt-2 text-xs uppercase tracking-[.12em] text-[#597066]">{place}</p></div>)}
            </div>
          </div>
        </section>

        <section className="bg-[#183b2d] px-5 py-24 text-[#f3eee3] sm:px-10 sm:py-36">
          <div className="mx-auto max-w-[1200px]">
            <SectionLabel number="06" light>Words from a future neighbour</SectionLabel>
            <div className="mt-12 grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <Quote size={42} strokeWidth={1} className="text-[#d36c50]" />
              <div><p className="font-display text-4xl leading-[.94] tracking-[-.02em] sm:text-6xl">“We were looking for a home that didn’t feel like an apartment with better finishes. The Canopy feels like a little piece of Bengaluru we can keep.”</p><div className="mt-8 flex items-center justify-between border-t border-[#d5dfd0]/20 pt-5"><div><p className="text-sm font-bold">Ananya & Rohan M.</p><p className="mt-1 text-xs text-[#9db09d]">Private preview guest · Whitefield</p></div><span className="font-mono text-[10px] text-[#9db09d]">VC / 01</span></div></div>
            </div>
          </div>
        </section>

        <section className="bg-[#d36c50] px-5 py-20 text-[#183b2d] sm:px-10 sm:py-28" id="contact">
          <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-12 lg:flex-row lg:items-end">
            <div><SectionLabel number="07">Your next chapter</SectionLabel><h2 className="font-display mt-5 max-w-3xl text-[clamp(4rem,9vw,9.2rem)] leading-[.78] tracking-[-.05em]">Come home<br /><em>to the garden.</em></h2></div>
            <div className="max-w-xs lg:pb-2"><p className="text-sm leading-6">Private previews are now open for The Canopy. Tell us what you’re looking for, and we’ll take it from there.</p><button type="button" onClick={() => openEnquiry()} className="mt-7 flex w-full items-center justify-between bg-[#183b2d] px-5 py-4 text-[11px] font-bold uppercase tracking-[.13em] text-[#f3eee3] transition hover:bg-[#285541]" data-testid="button-final-enquiry">Register your interest <ArrowUpRight size={18} /></button></div>
          </div>
        </section>
      </main>

      <footer className="bg-[#f3eee3] px-5 pb-8 pt-16 text-[#183b2d] sm:px-10 sm:pt-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 border-b border-[#183b2d]/20 pb-14 sm:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_.8fr]">
            <div><Logo /><p className="mt-7 max-w-xs text-sm leading-6 text-[#597066]">Thoughtful homes for the way Bengaluru wants to live next.</p></div>
            <div><p className="eyebrow text-[#597066]">Explore</p><div className="mt-5 flex flex-col gap-3 text-sm"><a href="#projects" className="transition hover:text-[#b85f47]" data-testid="link-footer-projects">The collection</a><a href="#approach" className="transition hover:text-[#b85f47]" data-testid="link-footer-approach">Our approach</a><a href="#neighbourhood" className="transition hover:text-[#b85f47]" data-testid="link-footer-neighbourhood">The neighbourhood</a></div></div>
            <div><p className="eyebrow text-[#597066]">Start a conversation</p><div className="mt-5 flex flex-col gap-3 text-sm"><a href={`tel:${BRAND.phone.replace(/\s/g, '')}`} className="transition hover:text-[#b85f47]" data-testid="link-footer-phone">{BRAND.phone}</a><a href={`mailto:${BRAND.email}`} className="transition hover:text-[#b85f47]" data-testid="link-footer-email">{BRAND.email}</a><p className="leading-6 text-[#597066]">{BRAND.address}</p></div></div>
          </div>
          <div className="flex flex-col justify-between gap-4 pt-6 text-[10px] uppercase tracking-[.13em] text-[#789087] sm:flex-row"><p>© 2025 {BRAND.name}</p><p>Designed for a more verdant Bengaluru</p><a href="#top" className="flex items-center gap-2 transition hover:text-[#183b2d]" data-testid="link-back-top">Back to top <ArrowUp size={13} /></a></div>
        </div>
      </footer>

      <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#183b2d] text-[#d5dfd2] shadow-lg transition hover:-translate-y-1 hover:bg-[#d36c50] hover:text-[#183b2d] sm:bottom-7 sm:right-7" aria-label="Chat on WhatsApp" data-testid="link-whatsapp"><span className="font-mono text-[10px]">WA</span></a>

      {showEnquiry && <EnquiryModal selectedProject={selectedProject} onClose={() => setShowEnquiry(false)} />}
      {showStory && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(14,34,27,.78)] p-5" role="dialog" aria-modal="true" aria-label="The Verdant life story" data-testid="dialog-story"><div className="relative aspect-video w-full max-w-4xl overflow-hidden bg-[#183b2d]"><img src="/garden-living.jpg" alt="Verdant Crest garden residence" className="h-full w-full object-cover opacity-55" /><div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-[#f3eee3]"><button type="button" onClick={() => setShowStory(false)} className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center border border-[#f3eee3]/40" aria-label="Close story" data-testid="button-close-story"><X size={17} /></button><span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#f3eee3]"><Play size={20} fill="currentColor" /></span><p className="eyebrow mt-7 text-[#d36c50]">The Verdant life</p><p className="font-display mt-3 text-5xl sm:text-7xl">A slower kind of luxury.</p><p className="mt-4 max-w-sm text-sm text-[#d5dfd2]">The full film will play here in the finished presentation.</p></div></div></div>}
    </div>
  );
}

function ArrowRightIcon() {
  return <ArrowUpRight size={16} />;
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;