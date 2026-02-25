import { Navigation } from "@/components/Navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1 pb-20">
      <main className="flex-1 overflow-auto">
        {children}
      </main>
      <Navigation />
    </div>
  );
}