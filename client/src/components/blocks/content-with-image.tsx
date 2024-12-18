import type { ContentWithImageProps } from "@/types/blocks";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { StrapiImage } from "@/components/custom/strapi-image";

export function ContentWithImage(data: Readonly<ContentWithImageProps>) {
  if (!data) return null;
  const { reverse, image, heading, subHeading, text, link } = data;
  const revereStyle = reverse ? "md:flex-row-reverse" : "md:flex-row";

  return (
    <section
      className={cn(
        "container flex flex-col gap-10 py-24 md:items-center md:gap-24",
        revereStyle
      )}
    >
      <div className="relative flex-1">
        <StrapiImage
          src={image.url}
          alt={image.name}
          width={713}
          height={497.7}
          className="rounded-xl border border-border shadow-lg"
        />
      </div>
      <div className="flex flex-1 flex-col items-start gap-5">
        <div className="flex flex-col gap-3">
          <span className="font-bold uppercase text-primary text-left">
            {subHeading}
          </span>
          <h2 className="font-heading text-3xl font-semibold sm:text-4xl text-left">
            {heading}
          </h2>
        </div>
        <ReactMarkdown className="richtext text-lg text-muted-foreground max-w-lg text-left">
          {text}
        </ReactMarkdown>
        {link && (
          <Link
            href={link.href}
            target={link.isExternal ? "_blank" : "_self"}
            rel="noopener noreferrer"
            prefetch
          >
            {link.label}
          </Link>
        )}
      </div>
    </section>
  );
}
