/* eslint-disable no-console, import/no-extraneous-dependencies, prefer-const, no-shadow */

require('dotenv').config();

const log = (message, section) =>
  console.log(`\n\u001B[36m${message} \u001B[4m${section}\u001B[0m\u001B[0m\n`);

const path = require('path');
const createPaginatedPages = require('gatsby-paginate');

const templatesDirectory = path.resolve(__dirname, '../../templates');
const templates = {
  articles: path.resolve(templatesDirectory, 'articles.template.tsx'),
  article: path.resolve(templatesDirectory, 'article.template.tsx'),
  tag: path.resolve(templatesDirectory, 'tag.template.tsx'),
};

const query = require('../data/data.query');
const normalize = require('../data/data.normalize');

// ///////////////// Utility functions ///////////////////

function buildPaginatedPath(index, basePath) {
  if (basePath === '/') {
    return index > 1 ? `${basePath}page/${index}` : basePath;
  }
  return index > 1 ? `${basePath}/page/${index}` : basePath;
}

const byDate = (a, b) => new Date(b.dateForSEO) - new Date(a.dateForSEO);

const slugify = (string, base) => {
  const slug = string
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  return `${base}/${slug}`.replace(/\/\/+/g, '/');
};
// ///////////////////////////////////////////////////////

module.exports = async ({ actions: { createPage }, graphql }, themeOptions) => {
  const {
    rootPath,
    basePath = '/',
    pageLength = 6,
    sources = {},
    mailchimp = '',
  } = themeOptions;

  const { data } = await graphql(`
    query siteQuery {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);

  console.log(sources);
  // Defaulting to look at the local MDX files as sources.
  const { local = true } = sources;

  let articles;
  let tags;

  const dataSources = {
    local: { articles: [], tags: [] },
  };

  if (rootPath) {
    log('Config rootPath', rootPath);
  } else {
    log('Config rootPath not set, using basePath instead =>', basePath);
  }

  log('Config basePath', basePath);

  if (local) {
    try {
      log('Querying Articles source:', 'Local');
      const localArticles = await graphql(query.local.articles);
      const localTags = await graphql(query.local.tags);

      dataSources.local.articles = localArticles.data.articles.edges.map(
        normalize.local.articles,
      );
      dataSources.local.tags = localTags.data.tags.group.map(
        ({ fieldValue, totalCount }) => ({
          name: fieldValue,
          count: totalCount,
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  // Combining together all the articles from different sources
  articles = [...dataSources.local.articles].sort(byDate);
  tags = [...dataSources.local.tags];

  const articlesThatArentSecret = articles.filter(article => !article.secret);

  if (articles.length === 0) {
    throw new Error(`
    You must have at least one Post. As reference you can view the
    example repository. Look at the content folder in the example repo.
    https://github.com/narative/gatsby-theme-novela-example
  `);
  }

  /**
   * Once we've queried all our data sources and normalized them to the same structure
   * we can begin creating our pages. First, we'll want to create all main articles pages
   * that have pagination.
   * /articles
   * /articles/page/1
   * ...
   */
  log('Creating', 'articles page');
  createPaginatedPages({
    edges: articlesThatArentSecret,
    pathPrefix: basePath,
    createPage,
    pageLength,
    pageTemplate: templates.articles,
    buildPath: buildPaginatedPath,
    context: {
      basePath,
      skip: pageLength,
      limit: pageLength,
    },
  });

  /**
   * Once the list of articles have bene created, we need to make individual article posts.
   */
  log('Creating', 'article posts');
  articles.forEach((article, index) => {
    /**
     * We need a way to find the next artiles to suggest at the bottom of the articles page.
     * To accomplish this there is some special logic surrounding what to show next.
     */
    let next = articlesThatArentSecret.slice(index + 1, index + 3);
    // If it's the last item in the list, there will be no articles. So grab the first 2
    if (next.length === 0) next = articlesThatArentSecret.slice(0, 2);
    // If there's 1 item in the list, grab the first article
    if (next.length === 1 && articlesThatArentSecret.length !== 2)
      next = [...next, articlesThatArentSecret[0]];
    if (articlesThatArentSecret.length === 1) next = [];

    createPage({
      path: article.slug,
      component: templates.article,
      context: {
        article,
        basePath,
        permalink: `${data.site.siteMetadata.siteUrl}${article.slug}/`,
        slug: article.slug,
        id: article.id,
        title: article.title,
        canonicalUrl: article.canonical_url,
        mailchimp,
        next,
      },
    });
  });

  tags.forEach(tag => {
    const articlesWithTag = articlesThatArentSecret.filter(article =>
      article.tags.includes(tag.name),
    );

    const path = slugify(tag.name, '/tag');

    createPaginatedPages({
      edges: articlesWithTag,
      pathPrefix: path,
      createPage,
      pageLength,
      pageTemplate: templates.tag,
      buildPath: buildPaginatedPath,
      context: {
        tag,
        originalPath: path,
        skip: pageLength,
        limit: pageLength,
      },
    });
  });
};
