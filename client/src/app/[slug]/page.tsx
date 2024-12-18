import qs from "qs";
import { notFound } from "next/navigation";

import { fetchAPI } from "@/lib/fetch-api";
import { getStrapiURL } from "@/lib/utils";
import { BlockRenderer } from "@/components/blocks/block-renderer";

const homePageQuery = (slug: string) =>
  qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      blocks: {
        on: {
          "blocks.hero": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              links: true,
            },
          },
          "blocks.card-carousel": {
            populate: {
              cards: true,
            },
          },
          "blocks.heading": true,
          "blocks.content-with-image": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              link: true,
            },
          },
        },
      },
    },
  });

async function loader(slug: string) {
  const BASE_URL = getStrapiURL();
  const path = "/api/pages";
  const url = new URL(path, BASE_URL);

  url.search = homePageQuery(slug);

  const data = await fetchAPI(url.href, {
    method: "GET",
  });

  if (data?.data.length === 0) notFound();

  const blocks = data?.data?.[0]?.blocks;
  return { blocks };
}

interface DynamicPageRouteProps {
  params: { slug: string };
}

// https://nextjs.org/docs/messages/sync-dynamic-apis
export default async function DynamicPageRoute({
  params,
}: Readonly<DynamicPageRouteProps>) {
  const { slug } = await params;
  const data = await loader(slug);
  const blocks = data.blocks;
  return <BlockRenderer blocks={blocks} />;
}
