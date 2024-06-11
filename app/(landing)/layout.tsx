import { Navbar, ProjectsContextSetter, Title } from "@/app/ui";
import { ProjectsContextProvider } from "../contexts/ProjectsContext";
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
        <ProjectsContextProvider>
          <ProjectsContextSetter />
          {children}
          {firstClickModal}
          {newProjectModal}
        </ProjectsContextProvider>
      </main>
    </HydrationBoundary>
  );
}
