import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://magiccode-dev.vercel.app/",
      lastModified: new Date(),
    },
    {
      url: "https://magiccode-dev.vercel.app/learn/",
      lastModified: new Date(),
    },
    {
      url: "https://magiccode-dev.vercel.app/problems/",
      lastModified: new Date(),
    },
    {
      url: "https://magiccode-dev.vercel.app/leaderboard/",
      lastModified: new Date(),
    },
    {
      url: "https://magiccode-dev.vercel.app/login/",
      lastModified: new Date(),
    },
    {
      url: "https://magiccode-dev.vercel.app/signup/",
      lastModified: new Date(),
    },
  ];
}
