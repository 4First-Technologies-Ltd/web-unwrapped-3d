import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import {
  SITE_SETTINGS,
  COLLECTION_DEFAULTS,
  getPageMeta,
  type PageMeta,
  type SiteSettings,
} from "@/content/defaults";

/**
 * Marketing-site read layer for the Supabase CMS (edited in `ft-digital-admin`).
 *
 * Design rule: NEVER throw. Every function returns fully-formed content, using
 * `src/content/defaults.ts` whenever the DB is unreachable, unconfigured, or a
 * row is missing. The live site must render identically with an empty database.
 */

export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
type Row = Record<string, unknown>;
type CollectionItem = { [key: string]: Json };

function str(v: unknown): string | undefined {
  return typeof v === "string" && v.length > 0 ? v : undefined;
}
function arr<T = unknown>(v: unknown): T[] | undefined {
  return Array.isArray(v) && v.length > 0 ? (v as T[]) : undefined;
}

function client() {
  const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"];
  const key = process.env["SUPABASE_ANON_KEY"] ?? process.env["VITE_SUPABASE_ANON_KEY"];
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export interface SiteContent {
  meta: PageMeta;
  collections: Record<string, CollectionItem[]>;
  settings: SiteSettings;
}

function mergePage(slug: string, row: Row | null): PageMeta {
  const base = getPageMeta(slug);
  if (!row) return base;
  const hero = (row["hero"] && typeof row["hero"] === "object" ? row["hero"] : {}) as Row;
  return {
    meta_title: str(row["meta_title"]) ?? base.meta_title,
    meta_description: str(row["meta_description"]) ?? base.meta_description,
    og_title: str(row["og_title"]) ?? base.og_title,
    og_description: str(row["og_description"]) ?? base.og_description,
    canonical: str(row["canonical"]) ?? base.canonical,
    hero: {
      eyebrow: str(hero["eyebrow"]) ?? base.hero.eyebrow,
      heading: str(hero["heading"]) ?? base.hero.heading,
      intro: arr<string>(hero["intro"]) ?? base.hero.intro,
    },
  };
}

function mergeSettings(row: Row | null): SiteSettings {
  if (!row) return SITE_SETTINGS;
  return {
    contact_email: str(row["contact_email"]) ?? SITE_SETTINGS.contact_email,
    contact_phone: str(row["contact_phone"]) ?? SITE_SETTINGS.contact_phone,
    linkedin_url: str(row["linkedin_url"]) ?? SITE_SETTINGS.linkedin_url,
    studio_address: str(row["studio_address"]) ?? SITE_SETTINGS.studio_address,
    hours: str(row["hours"]) ?? SITE_SETTINGS.hours,
    footer_tagline: str(row["footer_tagline"]) ?? SITE_SETTINGS.footer_tagline,
    og_image_url: str(row["og_image_url"]) ?? SITE_SETTINGS.og_image_url,
    metrics: arr<SiteSettings["metrics"][number]>(row["metrics"]) ?? SITE_SETTINGS.metrics,
    ticker: arr<string>(row["ticker"]) ?? SITE_SETTINGS.ticker,
    socials: arr<SiteSettings["socials"][number]>(row["socials"]) ?? SITE_SETTINGS.socials,
  };
}

export const fetchSiteContent = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string; collections?: string[] }) => input)
  .handler(async ({ data }): Promise<SiteContent> => {
    const { slug, collections = [] } = data;
    const fallback: SiteContent = {
      meta: getPageMeta(slug),
      collections: Object.fromEntries(
        collections.map((k) => [
          k,
          (COLLECTION_DEFAULTS[k] ?? []) as unknown as CollectionItem[],
        ]),
      ),
      settings: SITE_SETTINGS,
    };

    const supabase = client();
    if (!supabase) return fallback;

    try {
      const [pageRes, settingsRes, itemsRes] = await Promise.all([
        supabase.from("pages").select("*").eq("slug", slug).eq("is_published", true).maybeSingle(),
        supabase
          .from("site_settings")
          .select("*")
          .order("updated_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
        collections.length
          ? supabase
              .from("collection_items")
              .select("collection_key, position, data, body_rich, is_published")
              .in("collection_key", collections)
              .eq("is_published", true)
              .order("position", { ascending: true })
          : Promise.resolve({ data: [] as Row[] }),
      ]);

      const rows = (itemsRes.data ?? []) as Row[];
      const byKey: Record<string, CollectionItem[]> = {};
      for (const key of collections) {
        const forKey = rows.filter((r) => r["collection_key"] === key);
        byKey[key] = forKey.length
          ? forKey.map((r) => ({
              ...((r["data"] ?? {}) as CollectionItem),
              _rich: (r["body_rich"] ?? null) as Json,
            }))
          : ((COLLECTION_DEFAULTS[key] ?? []) as unknown as CollectionItem[]);
      }

      return {
        meta: mergePage(slug, (pageRes.data as Row | null) ?? null),
        collections: byKey,
        settings: mergeSettings((settingsRes.data as Row | null) ?? null),
      };
    } catch (err) {
      console.error("[cms] fetchSiteContent failed, using defaults", err);
      return fallback;
    }
  });

/** Contact-form submissions are also stored in the CMS for the admin dashboard. */
export const recordContactSubmission = createServerFn({ method: "POST" })
  .inputValidator(
    (input: {
      name: string;
      email: string;
      company?: string;
      interests?: string[];
      brief: string;
    }) => input,
  )
  .handler(async ({ data }) => {
    const supabase = client();
    if (!supabase) return { stored: false };
    try {
      await supabase.from("contact_submissions").insert({
        name: data.name,
        email: data.email,
        company: data.company || null,
        interests: data.interests ?? [],
        brief: data.brief,
      });
      return { stored: true };
    } catch (err) {
      console.error("[cms] recordContactSubmission failed", err);
      return { stored: false };
    }
  });
