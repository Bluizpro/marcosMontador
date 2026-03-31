import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/90 backdrop-blur-sm text-white shadow-md">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold font-heading tracking-tighter text-accent">
          MM<span className="text-white">.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
          <Link href="#home" className="hover:text-accent transition-colors">Home</Link>
          <Link href="#servicos" className="hover:text-accent transition-colors">Serviços</Link>
          <Link href="#portfolio" className="hover:text-accent transition-colors">Portfólio</Link>
          <Link href="#depoimentos" className="hover:text-accent transition-colors">Depoimentos</Link>
          <Link href="#contato" className="px-5 py-2.5 bg-accent text-primary font-bold rounded-sm hover:bg-accent-yellow transition-all duration-300">
            Contato
          </Link>
        </nav>
      </div>
    </header>
  );
}
