import { Wordmark } from "@/components/ui/Brand";
import { club, navItems } from "@/content/club";

export default function Footer() {
  return (
    <footer className="border-t border-ivory/10 px-5 pb-28 pt-16 md:px-[7vw] md:pb-20 md:pt-20">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <Wordmark width={190} className="items-start" />

        <nav aria-label="Fußzeile">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-[0.6875rem] font-bold tracking-[0.2em] text-mute transition-colors hover:text-ivory"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={club.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[0.6875rem] font-bold tracking-[0.2em] text-mute transition-colors hover:text-ivory"
              >
                INSTAGRAM
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <p className="mt-12 border-t border-ivory/10 pt-6 text-[0.6875rem] leading-relaxed text-mute">
        © {new Date().getFullYear()} {club.nameFull} · {club.district}, Berlin —
        Impressum und Datenschutz folgen (Pflichtangaben vor Livegang).
      </p>
    </footer>
  );
}
