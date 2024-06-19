import { Navbar, Title } from "@/app/ui";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="w-screen flex flex-col items-center justify-start gap-4 px-2 pb-4">
        <Title />
        {children}
      </main>
    </>
  );
}
