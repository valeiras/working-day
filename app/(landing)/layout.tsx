import { Navbar, Title } from "@/app/ui";
import { getAllProjects } from "../lib/actions";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

export default async function Layout({
  children,
  firstClickModal,
  newProjectModal,
}: Readonly<{
  children: React.ReactNode;
  firstClickModal: React.ReactNode;
  newProjectModal: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <header>
        <Navbar />
      </header>
      <main className="flex flex-1 flex-col items-center justify-start gap-4">
        <Title />
        {children}
        {firstClickModal}
        {newProjectModal}
      </main>
    </HydrationBoundary>
  );
}
