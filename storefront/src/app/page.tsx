import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Hero />

      {/* Featured Collection - Grid Section */}
      <section className="section-padding bg-brand-cream-dark/20 font-sans">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h4 className="uppercase text-[0.6rem] tracking-[0.3em] font-bold text-brand-navy mb-4">Exclusividade</h4>
              <h2 className="text-4xl md:text-5xl font-serif">Coleção Limitada</h2>
            </div>
            <a href="#" className="text-sm font-bold border-b-2 border-brand-terracotta text-brand-terracotta pb-1 hover:opacity-70 transition-opacity">
              Ver todos os produtos
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[3/4] bg-white rounded-lg mb-4 overflow-hidden relative shadow-sm transition-all group-hover:shadow-xl group-hover:-translate-y-1 border border-brand-outline/5">
                  <div className="absolute inset-0 bg-brand-terracotta/5 group-hover:bg-transparent transition-colors" />
                  <div className="absolute top-4 right-4 bg-brand-terracotta text-white text-[0.6rem] px-3 py-1 rounded-full uppercase tracking-widest font-bold">
                    Novo
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-brand-cream text-brand-navy px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                      Vista Rápida
                    </button>
                  </div>
                </div>
                <h3 className="text-lg mb-1 group-hover:text-brand-terracotta transition-colors font-serif">Peça Exclusiva 0{i}</h3>
                <p className="text-brand-navy font-bold">R$ 289,00</p>
                <p className="text-[0.6rem] uppercase tracking-widest text-brand-text/40 mt-1">Selo Momo & Cia</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding font-sans">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative p-12 order-2 md:order-1">
             <div className="absolute top-0 right-0 w-full h-full bg-brand-terracotta/5 rounded-3xl -rotate-3" />
             <div className="relative aspect-square bg-brand-cream-dark rounded-2xl overflow-hidden shadow-2xl border border-brand-outline/10">
                <div className="absolute inset-0 flex items-center justify-center text-brand-terracotta/10 text-9xl font-serif italic select-none">M</div>
             </div>
          </div>
          <div className="order-1 md:order-2">
            <h4 className="uppercase text-[0.6rem] tracking-[0.3em] font-bold text-brand-navy mb-4">Nossa Essência</h4>
            <h2 className="text-4xl md:text-5xl mb-8 leading-tight font-serif">
              Trazer a melhor versão de cada pessoa através da moda.
            </h2>
            <div className="space-y-6 text-lg font-light leading-relaxed text-brand-text/80">
              <p>
                A Momo & Cia nasceu em São Paulo com um propósito claro: transformar o vestir em um ato de empoderamento e autodescoberta.
              </p>
              <p>
                Acreditamos na exclusividade. Por isso, nossas coleções são limitadas, garantindo que cada peça carregue a autenticidade de quem a veste.
              </p>
            </div>
            <button className="btn-secondary mt-10">Conheça nosso Propósito</button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-brand-navy text-brand-cream font-sans text-center">
        <div className="container mx-auto px-6">
           <h2 className="text-brand-cream text-4xl md:text-6xl mb-8 font-serif">Pronta para se <br /><span className="italic font-serif">reencontar?</span></h2>
           <p className="text-xl max-w-2xl mx-auto mb-12 opacity-80 font-light leading-relaxed">
             Explore peças desenhadas com dedicação para elevar sua autoestima e sofisticação.
           </p>
           <button className="btn-primary text-brand-navy bg-brand-cream hover:bg-brand-cream/90">
             Ver Coleção Completa
           </button>
        </div>
      </section>
    </div>
  );
}
