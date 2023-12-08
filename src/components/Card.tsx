import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import Author from "./Author";
import type { CollectionEntry } from "astro:content";
import { SITE } from "@config";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, description, author } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  return (
    <li className="my-6">
      <a
        href={href}
        className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
      </a>
      <div className={`flex items-center space-x-2`}>
        {author !== SITE.author && <Author author={author} />}
        <Datetime datetime={pubDatetime} />
      </div>
      <p>{description}</p>
    </li>
  );
}
