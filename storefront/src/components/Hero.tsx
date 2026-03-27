export default function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden font-sans">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full">
        <div className="md:col-span-6 z-10 flex flex-col justify-center gap-8 pl-0 md:pl-16">
          <h1 className="text-6xl md:text-8xl leading-[0.9] text-brand-terracotta font-serif">
            Moda que <br />
            <span className="italic font-serif">Transforma</span>
          </h1>
          <p className="text-xl md:text-2xl font-light text-brand-text/80 max-w-md">
            Peças exclusivas e limitadas desenhadas para revelar a sua melhor essência.
          </p>
          <div className="flex gap-6 mt-4">
            <button className="btn-primary">Descobrir Coleção</button>
            <button className="btn-secondary">Nossa História</button>
          </div>
        </div>
        
        <div className="md:col-span-6 relative h-[70vh] md:h-[100vh]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-cream-dark/30 rounded-full blur-3xl -z-10" />
          <div className="w-full h-full relative p-4">
            <div className="w-full h-full bg-brand-terracotta/5 rounded-2xl overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 flex items-center justify-center text-brand-terracotta/20 font-serif text-4xl uppercase tracking-widest italic select-none">
                Momo & Cia
              </div>
              <div className="absolute bottom-12 right-12 w-32 h-32 border-2 border-brand-terracotta/20 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
