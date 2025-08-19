import { getWorkCache } from "@/lib/cache";
import WorkPage from "./client";

export default async function Page() {
  const work = await getWorkCache();
  return <WorkPage workExperience={work} />;
}
