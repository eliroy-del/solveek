import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import type { NavService } from "@/lib/content";

export function SiteShell({
  children,
  services,
}: {
  children: React.ReactNode;
  services: NavService[];
}) {
  return (
    <>
      <ScrollProgress />
      <Header services={services} />
      <main className="flex-1">{children}</main>
      <Footer services={services} />
    </>
  );
}
