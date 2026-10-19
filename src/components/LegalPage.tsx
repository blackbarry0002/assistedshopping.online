import type { ReactNode } from "react";
import { PageHeader } from "./ui/PageHeader";
import { Container } from "./ui/Container";
import { ReviewNote } from "./ui/ReviewNote";

/**
 * Shell for policy pages. The text inside each policy is a structured
 * starting point, not legal advice — have it reviewed by a qualified
 * attorney for your business and the states you serve before launch.
 */
export function LegalPage({
  title,
  intro,
  lastUpdated,
  children,
}: {
  title: string;
  intro: string;
  lastUpdated: string | null;
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader eyebrow="Policies" title={title} intro={intro} />
      <Container className="py-14 sm:py-16">
        <div className="max-w-3xl">
          <p className="font-mono text-sm text-subtle">
            Last updated: {lastUpdated ?? "Not yet published"}
          </p>
          <div className="mt-6">
            <ReviewNote>
              This policy is a structured draft. It has not been reviewed by a lawyer and does not by
              itself guarantee legal compliance. Replace bracketed items with real business details
              and have the full text reviewed before launch.
            </ReviewNote>
          </div>
          <div className="prose-legal mt-4">{children}</div>
        </div>
      </Container>
    </>
  );
}
