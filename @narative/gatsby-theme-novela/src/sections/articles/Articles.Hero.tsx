import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';

import Section from '@components/Section';
import mediaqueries from '@styles/media';

const heroQuery = graphql`
  {
    site: allSite {
      edges {
        node {
          siteMetadata {
            hero {
              heading
              description
              maxWidth
            }
          }
        }
      }
    }
  }
`;

const ArticlesHero: React.FC = () => {
  const results = useStaticQuery(heroQuery);
  const hero = results.site.edges[0].node.siteMetadata.hero;

  return (
    <Section relative id="Articles__Hero">
      <HeadingContainer style={{ maxWidth: `${hero.maxWidth}px` }}>
        <HeroHeading dangerouslySetInnerHTML={{ __html: hero.heading }} />
        <HeroDescription dangerouslySetInnerHTML={{ __html: hero.description }} />
      </HeadingContainer>
    </Section>
  );
};

export default ArticlesHero;

const HeadingContainer = styled.div`
  margin: 100px 0;

  ${mediaqueries.desktop`
    width: 80%;
  `}

  ${mediaqueries.tablet`
    width: 100%;
  `}
`;

const HeroHeading = styled.h1`
  font-style: normal;
  font-weight: 600;
  font-size: 52px;
  line-height: 1.15;
  color: ${p => p.theme.colors.primary};

  a {
    color: ${p => p.theme.colors.accent};
  }

  ${mediaqueries.desktop`
    font-size: 38px
  `}

  ${mediaqueries.phablet`
    font-size: 32px;
  `}
`;

const HeroDescription = styled.p`
  font-style: normal;
  font-size: 20px;
  margin-top: 10px;
  color: ${p => p.theme.colors.grey};

  a {
    color: ${p => p.theme.colors.accent};
  }

  ${mediaqueries.desktop`
    font-size: 16px
  `}

  ${mediaqueries.phablet`
    font-size: 12px;
  `}
`;
