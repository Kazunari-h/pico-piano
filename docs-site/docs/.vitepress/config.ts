import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Web Audio Piano",
  description: "TypeScript Web Audio API toolkit + React hook",
  lang: "en-US",
  themeConfig: {
    logo: "/logo.svg",
    nav: [
      { text: "Guide", link: "/guide/getting-started" },
      { text: "API", link: "/#api" },
      { text: "GitHub", link: "https://github.com/kazunarihirosawa/web-audio-piano" }
    ],
    sidebar: {
      "/guide/": [
        {
          text: "Guide",
          items: [
            { text: "Getting Started", link: "/guide/getting-started" },
            { text: "React Hook", link: "/guide/react-hook" }
          ]
        }
      ]
    },
    socialLinks: [{ icon: "github", link: "https://github.com/kazunarihirosawa/web-audio-piano" }]
  }
});
