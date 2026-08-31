import { Wordmark } from "@/components/ui/Brand";
import { club, navItems } from "@/content/club";

export default function Footer() {
  return (
    <footer className="border-t border-ivory/12 px-5 py-16 md:px-[7vw] md:py-20">
      <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
        <Wordmark markSize={40} className="[&_.display]:text-lg" />

        <nav aria-label="Fußzeile">
          <ul className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-3 md:flex md:gap-10">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-[0.7rem] font-semibold tracking-[0.24em] text-mute transition-colors hover:text-ivory"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-14 flex flex-col gap-4 border-t border-ivory/10 pt-6 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-[0.5625rem] leading-relaxed tracking-[0.2em] text-mute">
          © {new Date().getFullYear()} {club.nameFull} · {club.city} — IMPRESSUM
          UND DATENSCHUTZ FOLGEN (PFLICHTANGABEN VOR LIVEGANG)
        </p>
        <a
          href={club.instagramUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="font-mono text-[0.5625rem] tracking-[0.2em] text-mute transition-colors hover:text-ivory"
        >
          INSTAGRAM · @{club.instagram.toUpperCase()}
        </a>
      </div>
    </footer>
  );
}
