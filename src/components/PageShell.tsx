import Link from "next/link";
import StickyMobileBar from "@/components/StickyMobileBar";

/** Gemeinsames Gerüst aller Unterseiten: Label, H1 (Keyword vorn), Intro, CTA. */
export default function PageShell({
  label,
  title,
  intro,
  children,
  ctaHref,
  ctaText,
}: {
  label: string;
  title: string;
  intro: string;
  children: React.ReactNode;
  ctaHref?: string;
  ctaText?: string;
}) {
  return (
    <main className="px-4 pb-24 pt-32 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <p className="tech-label mb-6">{label}</p>
        <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-wood-walnut sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-char/75">{intro}</p>
        {ctaHref && ctaText && (
          <Link
            href={ctaHref}
            className="mt-7 inline-block rounded-full bg-char px-6 py-3 font-medium text-wood-raw transition hover:bg-wood-walnut"
          >
            {ctaText}
          </Link>
        )}
        <div className="mt-12">{children}</div>
      </div>
      <StickyMobileBar />
    </main>
  );
}
