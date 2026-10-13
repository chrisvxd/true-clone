import posts from "../content/writings.json";

export type PostType = "opinions" | "announcements";

export type Post = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  authors: string[];
  type: PostType;
};

// The writings archive is a content collection (600+ posts) rather than Puck
// props; Puck components choose how to present it.
export const allPosts = (posts as Post[])
  .slice()
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export const getPost = (slug: string) => allPosts.find((p) => p.slug === slug);

export const postsByAuthor = (name: string) =>
  allPosts.filter((p) => p.authors.includes(name));

const parse = (iso: string) => new Date(`${iso}T12:00:00Z`);

export const formatLongDate = (iso: string) =>
  parse(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

export const formatShortDate = (iso: string) =>
  parse(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
