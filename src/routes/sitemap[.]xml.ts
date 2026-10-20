import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { fetchJobs } from "@/lib/careers";

const BASE_URL = "";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.8" },
          { path: "/mission", changefreq: "monthly", priority: "0.8" },
          { path: "/vision", changefreq: "monthly", priority: "0.8" },
          { path: "/products", changefreq: "monthly", priority: "0.9" },
          { path: "/services", changefreq: "monthly", priority: "0.9" },
          { path: "/work", changefreq: "monthly", priority: "0.8" },
          { path: "/careers", changefreq: "daily", priority: "0.7" },
          { path: "/contact", changefreq: "yearly", priority: "0.6" },
        ];

        // open vacancies only — closed/expired listings drop out of discovery
        try {
          const { jobs } = await fetchJobs({ data: { page: 1 } });
          for (const j of jobs) {
            entries.push({ path: `/careers/${j.slug}`, changefreq: "weekly", priority: "0.6" });
          }
        } catch {
          /* the static pages are still served */
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ].filter(Boolean).join("\n")
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
