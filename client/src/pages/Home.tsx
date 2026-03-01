import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Terminal,
  Code2,
  Play,
  ChevronDown,
  Layers,
  Database,
  Globe,
  Cpu,
  Zap,
  ArrowRight,
  Copy,
  Check,
  Menu,
  X,
} from "lucide-react";
import {
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiTailwindcss,
  SiNextdotjs,
  SiDocker,
  SiRedis,
  SiGraphql,
  SiGit,
  SiVite,
  SiFigma,
  SiAmazonwebservices,
  SiRust,
  SiGo,
  SiMongodb,
  SiExpress,
  SiLinux,
  SiMysql,
} from "react-icons/si";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const TECH_STACK = [
  { icon: SiReact, name: "React", color: "#61DAFB", category: "Frontend" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6", category: "Language" },
  { icon: SiNextdotjs, name: "Next.js", color: "#000000", category: "Frontend" },
  { icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4", category: "Frontend" },
  { icon: SiNodedotjs, name: "Node.js", color: "#339933", category: "Backend" },
  { icon: SiPython, name: "Python", color: "#3776AB", category: "Language" },
  { icon: SiExpress, name: "Express", color: "#CE412B", category: "Framework" },
  { icon: SiLinux, name: "Linux", color: "#00ADD8", category: "DevOps" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#336791", category: "Database" },
  { icon: SiMongodb, name: "MongoDB", color: "#DC382D", category: "Database" },
  { icon: SiMysql, name: "MySQL", color: "#E10098", category: "Database" },
  { icon: SiDocker, name: "Docker", color: "#2496ED", category: "DevOps" },
  { icon: SiAmazonwebservices, name: "AWS", color: "#FF9900", category: "Cloud" },
  { icon: SiGit, name: "Git", color: "#F05032", category: "DevOps" },
  { icon: SiVite, name: "Vite", color: "#646CFF", category: "Tooling" },
  { icon: SiFigma, name: "Figma", color: "#F24E1E", category: "Design" },
];

const PROJECTS = [
  {
    id: "whatsapp-chat-analyzer",
    title: "Whatsapp Chat Analyzer",
    description: "A Streamlit-based web application that analyzes exported WhatsApp chat files and provides detailed insights using Data Analytics and Natural Language Processing (NLP) techniques.",
    tags: ["Python", "Pandas", "Data Visualization", "Wordcloud"],
    githubUrl: "https://github.com/omnavle/Whatsapp-Chat-Analyzer",
    icon: Zap,
    accentColor: "hsl(258 75% 68%)",
    code: `Hi`,
  },
  {
    id: "movie-recommendation-system",
    title: "Movie Recommendation System",
    description: "A production-ready, full-stack AI-powered Movie Recommendation System built using Machine Learning, FastAPI, and Streamlit. This project demonstrates end-to-end system design.",
    tags: ["Python", "Pandas", "FastAPI", "Numpy", "TMDB API"],
    githubUrl: "https://github.com/omnavle/movie-recommendation-system",
    icon: Cpu,
    accentColor: "hsl(187 85% 45%)",
  },
  {
    id: "code-reviewer",
    title: "AI Code Reviewer",
    description: "Developed an AI-powered code editor that analyzes and reviews code in real-time,  providing instant feedback on syntax errors and logic improvements.",
    tags: ["React", "Node.js", "Tailwind", "Express", "Gemini API"],
    githubUrl: "https://github.com/omnavle/Code-Reviewer",
    icon: Layers,
    accentColor: "hsl(340 75% 60%)",
  },
  {
    id: "ai-dental-appointment-system",
    title: "Dentara – AI Dental Appointment System",
    description: "Built an AI-powered dental care platform that assists users in diagnosing dental issues and scheduling appointments with dentists. Integrated OpenAI API to enable an intelligent chatbot.",
    tags: ["GraphQL", "Node.js", "Redis", "TypeScript"],
    githubUrl: "https://github.com/omnavle/Dentara",
    icon: Globe,
    accentColor: "hsl(35 85% 60%)",
    
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function AnimatedSection({ children, className = "", delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlighted = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      /\b(import|from|export|const|let|var|function|async|await|return|new|class|interface|type|extends|implements|if|else|try|catch|throw|for|of|in|default)\b/g,
      '<span class="syntax-keyword">$1</span>'
    )
    .replace(
      /('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)/g,
      '<span class="syntax-string">$1</span>'
    )
    .replace(
      /\b(\d+(\.\d+)?)\b/g,
      '<span class="syntax-number">$1</span>'
    )
    .replace(
      /(\/\/.*$)/gm,
      '<span class="syntax-comment">$1</span>'
    )
    .replace(
      /\b(Server|Redis|Pipeline|FastAPI|ApolloServer|GraphQLError|RateLimiterRedis|Slot|Button|buttonVariants)\b/g,
      '<span class="syntax-type">$1</span>'
    );

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        data-testid="button-copy-code"
        className="absolute top-3 right-3 z-10 p-1.5 rounded-md bg-card border border-border opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-green-500" />
        ) : (
          <Copy className="w-3.5 h-3.5 text-muted-foreground" />
        )}
      </button>
      <div className="bg-[hsl(228,22%,6%)] dark:bg-[hsl(228,22%,5%)] rounded-md border border-border p-4 overflow-auto max-h-72 scrollbar-thin">
        <pre
          className="code-block text-[0.78rem] leading-relaxed text-[hsl(220,20%,80%)]"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const Icon = project.icon;
  return (
    <Card className="border border-card-border bg-card flex flex-col hover-elevate transition-all duration-300 group">
      <div className="p-5 flex flex-col gap-4 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div
            className="w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${project.accentColor}18`, border: `1px solid ${project.accentColor}30` }}
          >
            <Icon className="w-5 h-5" style={{ color: project.accentColor }} />
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-base leading-snug mb-1.5" data-testid={`text-project-title-${project.id}`}>
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs" data-testid={`badge-tag-${project.id}-${tag}`}>
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-4">
  <a
    href={project.githubUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="block"
  >
    <Button className="w-full flex items-center justify-center gap-2">
      <Code2 className="w-4 h-4" />
      View Code on GitHub
    </Button>
  </a>
</div>
      </div>
    </Card>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground" data-testid="container-home">
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <button
            onClick={() => scrollTo("hero")}
            className="font-mono text-sm font-semibold gradient-text"
            data-testid="link-logo"
          >
            {"<Om.Dev />"}
          </button>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href.slice(1))}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md"
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              size="sm"
              onClick={() => scrollTo("contact")}
              className="hidden md:flex"
              data-testid="button-contact-nav"
            >
              Hire Me
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md">
            <div className="max-w-5xl mx-auto px-6 py-3 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href.slice(1))}
                  className="py-2 text-sm text-left text-muted-foreground hover:text-foreground transition-colors"
                  data-testid={`link-mobile-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center px-6 hero-gradient"
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Glow blobs */}
        <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
          <AnimatedSection delay={0}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/8 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-medium text-primary">Open for opportunities</span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none">
              <span className="text-foreground">Om</span>{" "}
              <span className="gradient-text">Navle</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Terminal className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="font-mono text-sm md:text-base">
                Full-Stack Engineer · ML Engineer · Data Scientist
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl">
              Full-Stack Engineer building scalable web systems, ML models, and AI-driven data solutions.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                onClick={() => scrollTo("projects")}
                data-testid="button-view-work"
              >
                View My Work
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
  size="lg"
  variant="outline"
  onClick={() => window.open("/resume.pdf", "_blank")}
>
  View Resume
</Button>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={500}>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/omnavle"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-hero-github"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/omnavle/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-hero-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=omnavle06@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </AnimatedSection>
        </div>

        <button
          onClick={() => scrollTo("about")}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors animate-bounce"
          data-testid="button-scroll-down"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 scroll-mt-nav">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-12">
              <span className="text-xs font-mono text-accent uppercase tracking-widest">01 / About</span>
              <div className="flex-1 h-px bg-border" />
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection delay={100}>
              <div className="space-y-5">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Passionate about building{" "}
                  <span className="gradient-text">intelligent and scalable systems
                  </span>
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  As a Full-Stack Engineer, ML Engineer, and Data Scientist, I design high-performance 
                  web applications and production-grade AI solutions. I focus on clean architecture, scalable data pipelines, and deploying machine learning systems that deliver real-world impact.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Currently exploring LLM pipelines, distributed AI systems, 
                  and building developer-friendly tools powered by data and machine learning.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="relative">
                <div className="rounded-lg border border-border bg-card p-5 font-mono text-sm">
                  <div className="flex items-center gap-1.5 mb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    <span className="ml-2 text-[0.65rem] text-muted-foreground">alex.ts</span>
                  </div>
                  <div className="space-y-1 text-[0.78rem] leading-relaxed">
                    <div><span className="syntax-keyword">const</span> <span className="text-accent">alex</span> <span className="text-muted-foreground">=</span> {"{"}</div>
                    <div className="pl-4"><span className="text-foreground">name:</span> <span className="syntax-string">'Om Navle'</span>,</div>
                    <div className="pl-4"><span className="text-foreground">role:</span> <span className="syntax-string">'Full-Stack Engineer, ML Engineer, Data Scientist'</span>,</div>
                    <div className="pl-4"><span className="text-foreground">location:</span> <span className="syntax-string">'Pune, India'</span>,</div>
                    <div className="pl-4"><span className="text-foreground">skills:</span> [</div>
                    <div className="pl-8"><span className="syntax-string">'Mern'</span>,</div>
                    <div className="pl-8"><span className="syntax-string">'Python'</span>,</div>
                    <div className="pl-8"><span className="syntax-string">'Devops'</span>,</div>
                    <div className="pl-4">],</div>
                    <div className="pl-4"><span className="text-foreground">available:</span> <span className="syntax-keyword">true</span>,</div>
                    <div className="pl-4"><span className="text-foreground">coffee:</span> <span className="syntax-string">'always'</span>,</div>
                    {"}"}</div>
                </div>
                <div
                  className="absolute -top-3 -right-3 w-16 h-16 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center animate-float"
                  aria-hidden="true"
                >
                  <Code2 className="w-6 h-6 text-primary/60" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="stack" className="py-24 px-6 scroll-mt-nav bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono text-accent uppercase tracking-widest">02 / Stack</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Tools &amp; <span className="gradient-text">Technologies</span>
            </h2>
            <p className="text-muted-foreground mb-10 max-w-xl">
              The technologies I use to build, ship, and scale production applications.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TECH_STACK.map((tech, i) => {
              const Icon = tech.icon;
              return (
                <AnimatedSection key={tech.name} delay={i * 40}>
                  <div
                    className="flex items-center gap-3 p-3 rounded-md border border-border/60 bg-card hover-elevate cursor-default group transition-all duration-200"
                    data-testid={`badge-tech-${tech.name.toLowerCase()}`}
                  >
                    <Icon
                      className="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                      style={{ color: tech.color }}
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{tech.name}</div>
                      <div className="text-[0.65rem] text-muted-foreground">{tech.category}</div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 scroll-mt-nav">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono text-accent uppercase tracking-widest">03 / Projects</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Selected <span className="gradient-text">Work</span>
            </h2>
            <p className="text-muted-foreground mb-10 max-w-xl">
              Production projects with github repository.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-5">
            {PROJECTS.map((project, i) => (
              <AnimatedSection key={project.id} delay={i * 100}>
                <ProjectCard project={project} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 scroll-mt-nav bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-12">
              <span className="text-xs font-mono text-accent uppercase tracking-widest">04 / Contact</span>
              <div className="flex-1 h-px bg-border" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Let&apos;s Build Something{" "}
                <span className="gradient-text">Together</span>
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed max-w-md mx-auto">
                I&apos;m open to full-time roles, consulting projects, and open source collaboration.
                Let&apos;s talk!
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "omnavle06@gmail.com",
                  href: "https://mail.google.com/mail/?view=cm&fs=1&to=omnavle06@gmail.com",
                  testId: "link-contact-email",
                },
                {
                  icon: Github,
                  label: "GitHub",
                  value: "@omnavle",
                  href: "https://github.com/omnavle",
                  testId: "link-contact-github",
                },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  value: "Om Navle",
                  href: "https://www.linkedin.com/in/omnavle/",
                  testId: "link-contact-linkedin",
                },
              ].map((contact) => {
                const Icon = contact.icon;
                return (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex flex-col items-center gap-3 p-5 rounded-lg border border-border bg-card hover-elevate transition-all duration-200 text-center"
                    data-testid={contact.testId}
                  >
                    <div className="w-10 h-10 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">{contact.label}</div>
                      <div className="text-sm font-medium">{contact.value}</div>
                    </div>
                  </a>
                );
              })}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <div className="text-center">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=omnavle06@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg">
                  Send me an email
                  <Mail className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/omnavle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-footer-github"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/omnavle/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-footer-linkedin"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
          <span className="text-xs text-muted-foreground">
            &copy; 2026 Om Navle. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
