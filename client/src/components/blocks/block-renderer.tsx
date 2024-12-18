import type { Block } from "@/types";

import { Hero } from "@/components/blocks/hero";
import { Heading } from "@/components/blocks/heading";
import { CardCarousel } from "@/components/blocks/card-carousel";
import { ContentWithImage } from "@/components/blocks/content-with-image";

const BLOCK_COMPONENTS = {
  "blocks.hero": Hero,
  "blocks.card-carousel": CardCarousel,
  "blocks.heading": Heading,
  "blocks.content-with-image": ContentWithImage
} as const;

/* eslint-disable @typescript-eslint/no-explicit-any */
export function blockRenderer(block: Block, index: number) {
  const Component =
    BLOCK_COMPONENTS[block.__component as keyof typeof BLOCK_COMPONENTS];
  if (!Component) return null;

  return <Component {...(block as any)} key={index} />;
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return blocks.map((block: Block, index: number) => {
    return blockRenderer(block, index);
  });
}
