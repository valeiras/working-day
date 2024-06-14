import { Navbar, Title } from "@/app/ui";

export default async function Layout({
  children,
  firstClickModal,
  newProjectModal,
}: Readonly<{
  children: React.ReactNode;
  firstClickModal: React.ReactNode;
  newProjectModal: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="flex flex-1 flex-col items-center justify-start gap-4 px-2">
        <Title />
        {children}
        {firstClickModal}
        {newProjectModal}
      </main>
    </>
  );
}
