import Link from 'next/link';

export default function Header() {
  return (
    <header style={{ backgroundColor: 'rgba(45, 35, 33, 0.85)' }} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md text-white shadow-md border-b border-white/5">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img
            src="/marcos_montador.png"
            alt="Marcos Montador"
            className="h-16 w-auto object-contain rounded-full shadow-md"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
          <Link href="#home" className="hover:text-accent transition-colors">Home</Link>

          <Link href="#galeria" className="hover:text-accent transition-colors">Galeria</Link>
          <Link href="#depoimentos" className="hover:text-accent transition-colors">Depoimentos</Link>
          <Link href="#contato" style={{ backgroundColor: '#c5a059', color: '#14100f' }} className="px-6 py-2.5 font-bold rounded-full hover:opacity-90 transition-all duration-300">
            Contato
          </Link>
        </nav>
      </div>
    </header>
  );
}
