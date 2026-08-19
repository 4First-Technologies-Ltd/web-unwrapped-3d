import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "4First Technologies — Smarter Tech, Safer World." },
      {
        name: "description",
        content:
          "4First Technologies is a Nigerian technology company building intelligent systems that eliminate uncertainty in everyday use.",
      },
      { name: "author", content: "4First Technologies Limited" },
      { property: "og:site_name", content: "4First Technologies" },
      {
        property: "og:title",
        content: "4First Technologies — Smarter Tech, Safer World.",
      },
      {
        property: "og:description",
        content:
          "4First Technologies is a Nigerian technology company building intelligent systems that eliminate uncertainty in everyday use.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "4First Technologies — Smarter Tech, Safer World.",
      },
      {
        name: "twitter:description",
        content:
          "4First Technologies is a Nigerian technology company building intelligent systems that eliminate uncertainty in everyday use.",
      },
      {
        property: "og:image",
        content: "https://web-unwrapped-3d.lovable.app/og-image.png",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        name: "twitter:image",
        content: "https://web-unwrapped-3d.lovable.app/og-image.png",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "4First Technologies Limited",
          alternateName: "4First Technologies",
          url: "/",
          description:
            "A Nigerian technology company building intelligent systems that eliminate uncertainty in everyday use.",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Owerri",
            addressRegion: "Imo State",
            addressCountry: "NG",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/contact", label: "Contact" },
] as const;

function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/60 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-384 items-center justify-between px-5 py-4 sm:px-10">
        <Link to="/" className="flex items-center gap-3">
          <img src="/favicon.png" alt="4First Technologies logo" className="h-8 w-8 rounded-sm object-cover" />
          <span className="font-display text-sm leading-tight tracking-tight">
            4First
            <span className="block text-muted-foreground">Technologies</span>
          </span>
        </Link>
        <div className="hidden gap-8 text-sm text-muted-foreground md:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="transition-colors hover:text-primary"
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          to="/contact"
          className="hidden rounded-sm border border-primary/50 px-4 py-2 text-xs uppercase tracking-[0.18em] text-primary transition-all hover:bg-primary hover:text-primary-foreground md:inline-flex"
        >
          Start a project →
        </Link>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-border/70 text-foreground transition-colors hover:border-primary/60 hover:text-primary md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="flex w-full flex-col gap-0 border-border/60 bg-background/95 backdrop-blur-xl sm:max-w-xs">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="mt-8 flex flex-col gap-6 text-lg">
              {NAV_LINKS.map((item) => (
                <SheetClose asChild key={item.to}>
                  <Link
                    to={item.to}
                    className="transition-colors hover:text-primary"
                    activeOptions={{ exact: item.to === "/" }}
                    activeProps={{ className: "text-primary" }}
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </div>
            <SheetClose asChild>
              <Link
                to="/contact"
                className="mt-10 inline-flex items-center justify-center rounded-sm border border-primary/50 px-4 py-3 text-xs uppercase tracking-[0.18em] text-primary transition-all hover:bg-primary hover:text-primary-foreground"
              >
                Start a project →
              </Link>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border/60 px-5 py-16 sm:px-10">
      <div className="mx-auto max-w-384">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src="/favicon.png" alt="4First Technologies logo" className="h-8 w-8 rounded-sm object-cover" />
              <div className="font-display text-xl">4First Technologies</div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Smarter Tech, Safer World.
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Owerri · Imo State · Nigeria
            </p>
          </div>
          <FooterCol title="Navigate" links={NAV_LINKS} />
          <FooterCol
            title="Practice"
            links={[
              { to: "/services", label: "Intelligent systems" },
              { to: "/services", label: "Product engineering" },
              { to: "/services", label: "Cybersecurity" },
              { to: "/services", label: "Advisory" },
            ]}
          />
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">
              Elsewhere
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.linkedin.com/company/4firsttechnologieslimited/"
                  className="hover:text-primary transition"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  href="mailto:4firsttechnologieslimited@gmail.com"
                  className="hover:text-primary transition"
                >
                  4firsttechnologieslimited@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+2349064768335" className="hover:text-primary transition">
                  +234 906 476 8335
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} 4First Technologies Limited. All rights reserved.</div>
          <div className="font-mono">RC · Nigeria — built with intent.</div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: readonly { to: string; label: string }[];
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">
        {title}
      </div>
      <ul className="space-y-2 text-sm">
        {links.map((l, i) => (
          <li key={i}>
            <Link to={l.to} className="hover:text-primary transition">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
