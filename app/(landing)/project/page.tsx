import { getProjectCache } from "@/lib/cache";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectsPage from "./client";

export const metadata: Metadata = {
  title: "Projects",
    description: "Explore my projects showcasing various technologies and skills.",
}

export default async function Page() {
const allProjects = await getProjectCache(1, 0);
  if (!allProjects) {
    return notFound();
  }
  return <ProjectsPage projectData={allProjects.allProjects} />;

}