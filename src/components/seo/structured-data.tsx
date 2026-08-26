import { toJsonLdGraph } from "@/lib/seo";

type JsonLd = Record<string, unknown>;

type StructuredDataProps = {
  /** One schema, many schemas (@graph), or a pre-built @graph object */
  data: JsonLd | JsonLd[];
};

/**
 * Server-rendered JSON-LD for Next.js App Router.
 * Pass an array to emit a single @graph block.
 */
export function StructuredData({ data }: StructuredDataProps) {
  const payload = Array.isArray(data) ? toJsonLdGraph(data) : data;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
