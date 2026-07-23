import { notFound } from "next/navigation";
import { getPage, pageMetadata, RenderPage, routeParams } from "../site";

type RouteProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export function generateStaticParams() {
  return routeParams();
}

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  return pageMetadata(getPage(slug));
}

export default async function Page({ params }: RouteProps) {
  const { slug } = await params;
  const page = getPage(slug);

  if (!page) {
    notFound();
  }

  return <RenderPage page={page} />;
}
