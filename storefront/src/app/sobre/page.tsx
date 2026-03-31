import Image from "next/image";
import Link from "next/link";
import EditorialShell from "@/components/EditorialShell";

const storyImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDj8VTCKe8LfdYNNiTqjAPNRIsZSiwITNG__G1XAMkfMR6spSbFDaD6ZIx-ydhPa8vWz6H381ZFlcvigZuWRzprwcnmI3oLm8DIdKmGxxB3h415mrnZ1hT5TV8hxnKIwGAqmuASTlxRDVZV8QCHLBElkYLHHrOrlBOSxtSfPTRCzQkBKwN2bjM_7M5sVsbxzLFTM6vnt0GkdiSWIEY39OQuLIhMxK4kiF4d9L5nw204R4LqEzqPbxJ195TiATB2jxZDsk1CSwlkf6s";
const craftImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAZESSqTxVomiG1FyOdhXQGeuyCkEP4E5eVR2MQnhhAmbFxt5WzXLp8Jyvq6GK9uqQoLKAHnHil661ZPYMcrjGz-QEHZeYgGjEWxmmczky6ffN0t_3cbOvRnZoqaA6o1eJj3njhHDj2DAHpgZXxB7Kbdl9WqMAEpV69-SVW2CNE8zvvbhomK8PA-Nv8XOUJk0qv6VMKQucQ-k_3dkjcYS8Qe4H_LWAQSvvsNW_TCi7aCety4P6nxLLKqCFhICpDZLJy1ponCHOkHCA";
const visionImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAYhK0iXRav9ZOYvtOA8i2a-ZWC-rIjEH7FcOgqnle5hqtp6a4e4Ncw3IuPsm0maI7WDBmASrhylWolP9vsR6ZCqgNwdeFH8KO9Oiz2kyfaq5nIuvq6-8BYFqFUFO32KGzCr_dPpp_NxS1Xx08Fx8BkbPKKZnoiO2SgoPqB5WF54ML0x3RrCGRVBqOiS4CaTm7S5YW-Zt2R2dj_cNL_HsvrPHiutMtirj63Sin1GsCCnkZ1H1j2pxPD_zz4lxP5yejTKy1pIJh0TjU";

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <EditorialShell>
        <section className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="editorial-section">
            <p className="eyebrow">Legacy &amp; vision</p>
            <h1 className="mt-5 text-6xl leading-[0.88] md:text-8xl">
              The
              <br />
              MOMO
              <br />
              Story
            </h1>
            <p className="mt-10 max-w-md text-lg leading-relaxed text-brand-muted">
              A MOMO &amp; CIA nasce da vontade de transformar o ato de vestir
              em curadoria. Cada escolha de silhueta, textura e tom foi pensada
              para comunicar presenca sem excesso.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/colecao" className="btn-primary">
                Explorar colecao
              </Link>
              <Link href="/contato" className="btn-secondary">
                Falar com a equipe
              </Link>
            </div>
          </div>

          <div className="editorial-section relative bg-brand-surface-low">
            <div className="relative ml-auto aspect-[3/4] max-w-[34rem] overflow-hidden rounded-[2rem] shadow-[0_32px_80px_-36px_rgba(37,22,14,0.45)]">
              <Image
                src={storyImage}
                alt="Editorial da marca Momo & Cia"
                fill
                unoptimized
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-4 left-4 hidden w-44 overflow-hidden rounded-[1.5rem] border-8 border-brand-surface md:block">
              <div className="relative aspect-[3/4]">
                <Image
                  src={craftImage}
                  alt="Texturas e acabamento da marca"
                  fill
                  unoptimized
                  sizes="18vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </EditorialShell>

      <EditorialShell>
        <section className="editorial-section bg-brand-surface-low">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow">Craftsmanship</p>
              <h2 className="mt-5 text-4xl md:text-5xl">
                Luxo silencioso nasce de repeticao, paciencia e criterio.
              </h2>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-brand-muted">
                <p>
                  Trabalhamos a partir de colecoes limitadas e de uma leitura
                  precisa da mulher que busca permanencia, nao apenas novidade.
                </p>
                <p>
                  O que chamamos de premium nao e excesso. E o equilibrio entre
                  imagem, toque, caimento e serenidade visual.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="editorial-card flex aspect-[4/5] items-end p-6">
                <p className="text-2xl italic text-brand-ink">
                  Mao de obra local
                </p>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-brand-surface-high">
                <Image
                  src={craftImage}
                  alt="Artesanato da Momo & Cia"
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 20vw, 100vw"
                  className="object-cover grayscale"
                />
              </div>
            </div>
          </div>
        </section>
      </EditorialShell>

      <EditorialShell>
        <section className="editorial-section">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="relative aspect-[2/3] overflow-hidden rounded-[2rem] bg-brand-surface-high">
              <Image
                src={visionImage}
                alt="Visao editorial da marca"
                fill
                unoptimized
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="object-cover"
              />
            </div>

            <div>
              <p className="eyebrow">Vision</p>
              <h2 className="mt-5 text-5xl leading-tight md:text-6xl">
                Redefinir o guarda-roupa curado da mulher contemporanea.
              </h2>
              <p className="mt-8 max-w-2xl text-xl leading-relaxed text-brand-muted">
                Nossa visao e construir um catalogo com linguagem de revista:
                menos ruido, mais imagem, mais criterio. O storefront passa a
                sustentar esse posicionamento sem abrir mao do que ja funciona
                no Saleor.
              </p>
            </div>
          </div>
        </section>
      </EditorialShell>
    </div>
  );
}
