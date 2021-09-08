require("dotenv").config();

const siteMetadata = {
  title: `@kavimaluskam | A Blog by Alex Kam`,
  name: `@kavimaluskam`,
  siteUrl: `https://kavimaluskam.dev`,
  description: `Personal Blog by Alex Kam. About Data Engineering, Decentralization and more.`,
  hero: {
    heading: `@kavimaluskam`,
    description:`Personal Blog by Alex Kam. About Data Engineering, Decentralization and more.`,
    maxWidth: 1200,
  },
  social: [
    {
      name: `twitter`,
      url: `https://twitter.com/kavimaluskam`,
    },
    {
      name: `github`,
      url: `https://github.com/kavimaluskam`,
    },
    {
      name: `linkedin`,
      url: `https://www.linkedin.com/in/kavimaluskam/`,
    },
    {
      name: `medium`,
      url: `https://medium.com/@kavimaluskam`,
    },
    {
      name: `mailto`,
      url: `mailto:kavimaluskam@gmail.com`,
    },
  ],
  header: {
    navigation: [
      {
        label: "Blog",
        url: "/",
      },
      {
        label: "Links",
        url: "/links",
      },
      {
        label: "Bio",
        url: "/bio",
      },
    ],
  }
};

const plugins = [
  {
    resolve: "@narative/gatsby-theme-novela",
    options: {
      contentPosts: "content/posts",
      rootPath: "/",
      basePath: "/",
      mailchimp: true,
    },
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Novela by Narative`,
      short_name: `Novela`,
      start_url: `/`,
      background_color: `#fff`,
      theme_color: `#fff`,
      display: `standalone`,
      icon: `src/assets/favicon.png`,
    },
  },
  {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: "UA-118232427-3",
    },
  },
  {
    resolve: "gatsby-plugin-mailchimp",
    options: {
      endpoint:
        "https://dev.us5.list-manage.com/subscribe/post?u=47309eddfe8a1e14039453f05&amp;id=9fbaf42265",
    },
  },
];

module.exports = {
  siteMetadata,
  plugins,
};
