import React from 'react';

import SEO from '@components/SEO';

import { IArticle } from '@types';
import { graphql, useStaticQuery } from 'gatsby';

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            name
            siteUrl
          }
        }
      }
    }
  }
`;

interface ArticleSEOProps {
  article: IArticle;
  location: Location;
  imagelocation?: string;
}

const ArticleSEO: React.FC<ArticleSEOProps> = ({
  article,
  location,
  imagelocation,
}) => {
  const results = useStaticQuery(siteQuery);
  const siteUrl = results.allSite.edges[0].node.siteMetadata.siteUrl;
  const name = results.allSite.edges[0].node.siteMetadata.name;

  imagelocation = `${siteUrl + article.hero.seo.src}`;

  return (
    <SEO
      canonicalUrl={article.canonical_url}
      dateforSEO={article.dateForSEO}
      description={article.excerpt}
      image={imagelocation}
      isBlogPost={true}
      articlepathName={siteUrl + location.pathname}
      published={article.date}
      timeToRead={article.timeToRead}
      title={`${article.title} | ${name}`}
      isSecret={article.secret}
    ></SEO>
  );
};

export default ArticleSEO;
