import type { Config, Slot } from "@puckeditor/core";
import { SiteShell } from "./components/site/SiteShell";
import { site } from "./lib/site";
import { ImageHero, type ImageHeroProps } from "./components/blocks/ImageHero";
import { StatsGrid, type StatsGridProps } from "./components/blocks/StatsGrid";
import { Disclaimer, type DisclaimerProps } from "./components/blocks/Disclaimer";
import { LogoMarquee, type LogoMarqueeProps } from "./components/blocks/LogoMarquee";
import {
  PortfolioDirectory,
  type PortfolioDirectoryProps,
} from "./components/blocks/PortfolioDirectory";
import { ArticleIntro, type ArticleIntroProps } from "./components/blocks/ArticleIntro";
import { TextSection, type TextSectionProps } from "./components/blocks/TextSection";
import { Timeline, type TimelineProps } from "./components/blocks/Timeline";
import { NetworkMap, type NetworkMapProps } from "./components/blocks/NetworkMap";
import { TeamGrid, type TeamGridProps } from "./components/blocks/TeamGrid";
import { WritingsIndex, type WritingsIndexProps } from "./components/blocks/WritingsIndex";
import { TeamProfile, type TeamProfileProps } from "./components/blocks/TeamProfile";
import { PostArticle, type PostArticleProps } from "./components/blocks/PostArticle";
import { RichTextPage, type RichTextPageProps } from "./components/blocks/RichTextPage";

type Props = {
  ImageHero: ImageHeroProps;
  StatsGrid: StatsGridProps;
  Disclaimer: DisclaimerProps;
  LogoMarquee: LogoMarqueeProps;
  PortfolioDirectory: PortfolioDirectoryProps;
  ArticleIntro: ArticleIntroProps;
  TextSection: Omit<TextSectionProps, "content"> & { content: Slot };
  Timeline: TimelineProps;
  NetworkMap: NetworkMapProps;
  TeamGrid: TeamGridProps;
  WritingsIndex: WritingsIndexProps;
  TeamProfile: TeamProfileProps;
  PostArticle: PostArticleProps;
  RichTextPage: RichTextPageProps;
};

type RootProps = {
  title: string;
  background: "gradient" | "plain";
};

const link = {
  type: "object" as const,
  objectFields: { label: { type: "text" as const }, href: { type: "text" as const } },
};

const yesNo = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

export const config: Config<Props, RootProps> = {
  categories: {
    heroes: { title: "Heroes & intros", components: ["ImageHero", "ArticleIntro"] },
    sections: {
      title: "Sections",
      components: ["StatsGrid", "TextSection", "Timeline", "NetworkMap", "LogoMarquee", "Disclaimer"],
    },
    directories: {
      title: "Directories",
      components: ["PortfolioDirectory", "TeamGrid", "WritingsIndex"],
    },
    templates: { title: "Page templates", components: ["TeamProfile", "PostArticle", "RichTextPage"] },
  },

  root: {
    fields: {
      title: { type: "text" },
      background: {
        type: "radio",
        options: [
          { label: "Gradient", value: "gradient" },
          { label: "Plain", value: "plain" },
        ],
      },
    },
    defaultProps: { title: "True Ventures", background: "plain" },
    render: ({ children, background }) => (
      <SiteShell {...site} background={background}>
        {children}
      </SiteShell>
    ),
  },

  components: {
    ImageHero: {
      label: "Image hero",
      fields: {
        image: { type: "text", label: "Image URL" },
        imagePosition: {
          type: "select",
          options: [
            { label: "Center", value: "center" },
            { label: "Center (30%)", value: "center 30%" },
            { label: "Top", value: "top" },
          ],
        },
        tone: {
          type: "radio",
          options: [
            { label: "Warm", value: "warm" },
            { label: "Neutral", value: "neutral" },
          ],
        },
        align: {
          type: "radio",
          options: [
            { label: "Center", value: "center" },
            { label: "Left", value: "left" },
          ],
        },
        title: { type: "textarea", contentEditable: true },
        titleWeight: {
          type: "radio",
          options: [
            { label: "Light", value: "light" },
            { label: "Regular", value: "regular" },
          ],
        },
        subtitle: { type: "textarea" },
        cta: { ...link, label: "Button" },
        logoCells: {
          type: "array",
          label: "Rotating logo cells",
          max: 5,
          arrayFields: {
            logos: {
              type: "array",
              arrayFields: { name: { type: "text" }, src: { type: "text", label: "Logo URL" } },
              getItemSummary: (l) => l.name || "Logo",
            },
          },
          getItemSummary: (c, i) =>
            c.logos?.map((l) => l.name).join(", ") || `Cell ${(i ?? 0) + 1}`,
        },
        spacingBottom: {
          type: "select",
          options: [
            { label: "Tight", value: "tight" },
            { label: "Normal", value: "normal" },
            { label: "None", value: "none" },
          ],
        },
      },
      defaultProps: {
        image: "https://www.trueventures.com/group.jpg",
        imagePosition: "center",
        tone: "warm",
        align: "center",
        title: "First to believe.",
        titleWeight: "light",
        subtitle: "",
        cta: { label: "", href: "" },
        logoCells: [],
        spacingBottom: "tight",
      },
      render: (props) => <ImageHero {...props} />,
    },

    StatsGrid: {
      label: "Stats grid",
      fields: {
        stats: {
          type: "array",
          arrayFields: {
            value: { type: "text", contentEditable: true },
            label: { type: "text", contentEditable: true },
          },
          getItemSummary: (s) => `${s.value} — ${s.label}`,
        },
      },
      defaultProps: { stats: [{ value: "100+", label: "Companies" }] },
      render: (props) => <StatsGrid {...props} />,
    },

    Disclaimer: {
      fields: { text: { type: "textarea", contentEditable: true } },
      defaultProps: { text: "Disclaimer text." },
      render: (props) => <Disclaimer {...props} />,
    },

    LogoMarquee: {
      label: "Logo marquee",
      fields: {
        logos: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            src: { type: "text", label: "Logo URL" },
            url: { type: "text", label: "Link" },
          },
          getItemSummary: (l) => l.name || "Logo",
        },
        speed: {
          type: "radio",
          options: [
            { label: "Slow", value: "slow" },
            { label: "Medium", value: "medium" },
            { label: "Fast", value: "fast" },
          ],
        },
      },
      defaultProps: { logos: [], speed: "medium" },
      render: (props) => <LogoMarquee {...props} />,
    },

    PortfolioDirectory: {
      label: "Portfolio directory",
      fields: {
        tabs: {
          type: "object",
          objectFields: {
            highlights: { type: "text" },
            exits: { type: "text" },
            all: { type: "text" },
          },
        },
        defaultTab: {
          type: "radio",
          options: [
            { label: "Highlights", value: "highlights" },
            { label: "Exits", value: "exits" },
            { label: "All", value: "all" },
          ],
        },
        searchPlaceholder: { type: "text" },
        companies: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            url: { type: "text" },
            description: { type: "textarea" },
            categories: { type: "text", label: "Categories (comma separated)" },
            highlight: { type: "radio", options: yesNo },
            exit: { type: "radio", options: yesNo },
          },
          defaultItemProps: {
            name: "New company",
            url: "",
            description: "",
            categories: "",
            highlight: false,
            exit: false,
          },
          getItemSummary: (c) => c.name || "Company",
        },
      },
      defaultProps: {
        tabs: { highlights: "Highlights", exits: "Exits", all: "All" },
        defaultTab: "all",
        searchPlaceholder: "Search companies",
        companies: [],
      },
      render: (props) => <PortfolioDirectory {...props} />,
    },

    ArticleIntro: {
      label: "Article intro",
      fields: {
        title: { type: "textarea", contentEditable: true },
        accent: { type: "text", label: "Accent (blue italic ending)", contentEditable: true },
        intro: { type: "textarea", contentEditable: true },
      },
      defaultProps: { title: "Heading", accent: "", intro: "" },
      render: (props) => <ArticleIntro {...props} />,
    },

    TextSection: {
      label: "Text section",
      fields: {
        eyebrow: { type: "text" },
        heading: { type: "text", contentEditable: true },
        headingStyle: {
          type: "radio",
          options: [
            { label: "Serif", value: "serif" },
            { label: "Label", value: "label" },
          ],
        },
        body: { type: "richtext", contentEditable: true },
        spacingTop: {
          type: "radio",
          options: [
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" },
          ],
        },
        content: { type: "slot", allow: ["Timeline", "StatsGrid"] },
      },
      defaultProps: {
        eyebrow: "",
        heading: "Heading",
        headingStyle: "serif",
        body: "<p>Write something here.</p>",
        spacingTop: "md",
        content: [],
      },
      render: (props) => <TextSection {...props} />,
    },

    Timeline: {
      fields: {
        items: {
          type: "array",
          arrayFields: {
            year: { type: "text", contentEditable: true },
            name: { type: "text", contentEditable: true },
            url: { type: "text" },
            note: { type: "text" },
            exit: { type: "text", label: "Exit label" },
          },
          getItemSummary: (i) => `${i.year} · ${i.name}`,
        },
      },
      defaultProps: { items: [] },
      render: (props) => <Timeline {...props} />,
    },

    NetworkMap: {
      label: "Network map",
      fields: {
        sectors: {
          type: "array",
          arrayFields: { label: { type: "text" }, weight: { type: "number", min: 1 } },
          getItemSummary: (s) => s.label || "Sector",
        },
        connections: { type: "number", min: 0, max: 400 },
        centerLogo: { type: "text", label: "Center logo URL" },
        caption: { type: "textarea", contentEditable: true },
      },
      defaultProps: { sectors: [], connections: 90, centerLogo: "", caption: "" },
      render: (props) => <NetworkMap {...props} />,
    },

    TeamGrid: {
      label: "Team grid",
      fields: {
        groups: {
          type: "array",
          arrayFields: {
            title: { type: "text", contentEditable: true },
            members: {
              type: "array",
              arrayFields: {
                name: { type: "text", contentEditable: true },
                slug: { type: "text" },
                photo: { type: "text", label: "Photo URL" },
              },
              getItemSummary: (m) => m.name || "Member",
            },
          },
          getItemSummary: (g) => g.title || "Group",
        },
      },
      defaultProps: { groups: [] },
      render: (props) => <TeamGrid {...props} />,
    },

    WritingsIndex: {
      label: "Writings index",
      fields: {
        eyebrow: { type: "text", contentEditable: true },
        title: { type: "text", contentEditable: true },
        filters: {
          type: "object",
          objectFields: {
            all: { type: "text" },
            opinions: { type: "text" },
            announcements: { type: "text" },
          },
        },
        searchPlaceholder: { type: "text" },
        featuredCount: { type: "number", min: 0, max: 30 },
        archiveLabel: { type: "text", contentEditable: true },
        openYears: { type: "number", label: "Years expanded by default", min: 0 },
      },
      defaultProps: {
        eyebrow: "Our Perspectives",
        title: "Writings",
        filters: { all: "All", opinions: "Opinions", announcements: "Announcements" },
        searchPlaceholder: "Search posts",
        featuredCount: 12,
        archiveLabel: "Archive",
        openYears: 1,
      },
      render: (props) => <WritingsIndex {...props} />,
    },

    TeamProfile: {
      label: "Team profile",
      fields: {
        name: { type: "text" },
        role: { type: "text", contentEditable: true },
        photo: { type: "text", label: "Photo URL" },
        links: {
          type: "array",
          arrayFields: { label: { type: "text" }, url: { type: "text" } },
          getItemSummary: (l) => l.label || "Link",
        },
        bio: { type: "richtext", contentEditable: true },
        showWriting: { type: "radio", options: yesNo },
        writingLimit: { type: "number", min: 1, max: 20 },
      },
      defaultProps: {
        name: "Name",
        role: "",
        photo: "",
        links: [],
        bio: "<p>Bio goes here.</p>",
        showWriting: true,
        writingLimit: 6,
      },
      render: (props) => <TeamProfile {...props} />,
    },

    PostArticle: {
      label: "Post article",
      fields: {
        title: { type: "textarea", contentEditable: true },
        date: { type: "text", label: "Date (YYYY-MM-DD)" },
        authors: {
          type: "array",
          arrayFields: { name: { type: "text" } },
          getItemSummary: (a) => a.name || "Author",
        },
        body: { type: "richtext", contentEditable: true },
        sourceUrl: { type: "text", label: "Original URL" },
      },
      defaultProps: {
        title: "Post title",
        date: "",
        authors: [],
        body: "<p>Start writing.</p>",
        sourceUrl: "",
      },
      render: (props) => <PostArticle {...props} />,
    },

    RichTextPage: {
      label: "Rich text page",
      fields: {
        title: { type: "text", contentEditable: true },
        updated: { type: "text" },
        body: { type: "richtext", contentEditable: true },
      },
      defaultProps: { title: "Page title", updated: "", body: "<p>Content.</p>" },
      render: (props) => <RichTextPage {...props} />,
    },
  },
};

export default config;
