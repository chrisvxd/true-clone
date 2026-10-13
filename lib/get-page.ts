import { Data } from "@puckeditor/core";
import fs from "fs";
import team from "../content/team.json";
import { getPost } from "./writings";

// Team bios and individual posts don't need a stored page to exist. Until an
// editor publishes one at that path, they're generated from the content
// collections — and opening `/<path>/edit` starts from this generated page.
const generatedPage = (path: string): Data<any, any> | null => {
  const [, section, slug] = path.split("/");

  if (section === "team" && slug) {
    const member = team.find((m) => m.slug === slug);
    if (!member) return null;
    return {
      root: { props: { title: `${member.name} · True Ventures`, background: "plain" } },
      content: [
        {
          type: "TeamProfile",
          props: {
            id: `TeamProfile-${slug}`,
            name: member.name,
            role: member.role || member.group,
            photo: member.photo,
            links: member.links,
            bio: `<p>${member.name} is part of the ${member.group} team at True Ventures.</p><p>A full bio hasn’t been written for this page yet — add <code>/edit</code> to the URL to write one.</p>`,
            showWriting: true,
            writingLimit: 6,
          },
        },
      ],
    };
  }

  if (section === "writings" && slug) {
    const post = getPost(slug);
    if (!post) return null;
    return {
      root: { props: { title: `${post.title} · True Ventures`, background: "plain" } },
      content: [
        {
          type: "PostArticle",
          props: {
            id: `PostArticle-${slug}`,
            title: post.title,
            date: post.date,
            authors: post.authors.map((name) => ({ name })),
            body: "<p>The body of this post hasn’t been imported into the clone. Add <code>/edit</code> to the URL to write it in Puck, or read the original via the link below.</p>",
            sourceUrl: `https://www.trueventures.com/writings/${slug}`,
          },
        },
      ],
    };
  }

  return null;
};

// Replace with call to your database
export const getPage = (path: string) => {
  const allData: Record<string, Data> | null = fs.existsSync("database.json")
    ? JSON.parse(fs.readFileSync("database.json", "utf-8"))
    : null;

  return allData?.[path] ?? generatedPage(path);
};
