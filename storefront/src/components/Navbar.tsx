export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-brand-cream/80 backdrop-blur-xl border-b border-brand-outline/5 font-sans">
      <nav className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="text-2xl font-serif font-bold tracking-tighter text-brand-terracotta">
          MOMO & CIA
        </div>
        <div className="hidden md:flex gap-10 text-[0.7rem] uppercase tracking-[0.2em] font-bold text-brand-text/70">
          <a href="/" className="hover:text-brand-terracotta transition-colors">Home</a>
          <a href="/colecao" className="hover:text-brand-terracotta transition-colors">Coleção</a>
          <a href="/sobre" className="hover:text-brand-terracotta transition-colors">Sobre</a>
          <a href="/contato" className="hover:text-brand-terracotta transition-colors">Contato</a>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-[0.7rem] uppercase tracking-[0.1em] font-bold text-brand-terracotta hover:underline">Entrar</button>
          <button className="bg-brand-terracotta text-white px-6 py-2 rounded-md text-[0.7rem] uppercase tracking-widest font-bold shadow-lg shadow-brand-terracotta/20 hover:scale-105 transition-transform">Carrinho</button>
        </div>
      </nav>
    </header>
  );
}
