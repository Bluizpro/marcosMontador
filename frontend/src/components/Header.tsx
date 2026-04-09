'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#galeria', label: 'Galeria' },
    { href: '#depoimentos', label: 'Depoimentos' },
  ];

  return (
    <header style={{ backgroundColor: 'rgba(45, 35, 33, 0.95)' }} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md text-white shadow-md border-b border-white/5">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/marcos_montador.png"
            alt="Marcos Montador"
            width={64}
            height={64}
            className="h-16 w-auto object-contain rounded-full shadow-md"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-accent transition-colors">
              {link.label}
            </Link>
          ))}
          <Link href="#contato" style={{ backgroundColor: '#c5a059', color: '#14100f' }} className="px-6 py-2.5 font-bold rounded-full hover:opacity-90 transition-all duration-300">
            Contato
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`md:hidden absolute top-20 left-0 right-0 bg-[var(--primary)] border-b border-white/10 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-[400px] py-8 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
        <nav className="container mx-auto px-6 flex flex-col gap-6 text-center uppercase tracking-widest font-bold">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={toggleMenu} className="hover:text-accent transition-colors text-lg">
              {link.label}
            </Link>
          ))}
          <Link href="#contato" onClick={toggleMenu} className="text-accent text-lg">
            Contato
          </Link>
        </nav>
      </div>
    </header>
  );
}
