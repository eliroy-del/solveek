import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Solveek CRM",
    template: "%s · Solveek CRM",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CrmRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#eef1f7] text-navy antialiased">
      {children}
    </div>
  );
}
