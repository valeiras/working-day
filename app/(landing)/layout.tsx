import { Navbar, Title } from "@/app/ui";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="flex flex-1 flex-col items-center justify-start gap-4 p-24">
        <Title />
        {children}
      </main>
    </>
  );
}
