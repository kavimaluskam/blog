import React from 'react';
import styled from '@emotion/styled';

import { Link } from 'gatsby';

import Headings from '@components/Headings';
import Image, { ImagePlaceholder } from '@components/Image';

import mediaqueries from '@styles/media';
import { IArticle } from '@types';

import { slugify } from '@utils';

interface ArticleHeroProps {
  article: IArticle;
}

const ArticleHero: React.FC<ArticleHeroProps> = ({ article }) => {
  const hasHeroImage =
    article.hero &&
    Object.keys(article.hero.full).length !== 0 &&
    article.hero.full.constructor === Object;

  const hasHeroProvider = hasHeroImage && article.heroName && article.heroUrl;

  return (
    <Hero>
      <Header>
        <HeroTag>
          {article.tags.map(tag => (
            <Badge to={slugify(tag, '/tag')} data-a11y="false" key={tag}>
              {tag}
            </Badge>
          ))}
        </HeroTag>
        <HeroHeading>{article.title}</HeroHeading>
        <HeroSubtitle>
          <ArticleMeta>
            {article.date} · {article.timeToRead} min read
          </ArticleMeta>
        </HeroSubtitle>
      </Header>
      <HeroImage id="ArticleImage__Hero">
        {hasHeroImage ? (
          <Image src={article.hero.full} />
        ) : (
          <ImagePlaceholder />
        )}
      </HeroImage>
      {hasHeroProvider && (
        <HeroProvider>
          Photo by{` `}
          <a
            target="_blank"
            rel="noopener"
            data-a11y="false"
            href={article.heroUrl}
          >
            {article.heroName}
          </a>
        </HeroProvider>
      )}
    </Hero>
  );
};

export default ArticleHero;

const Hero = styled.div`
  ${p => mediaqueries.phablet`
    &::before {
      content: "";
      width: 100%;
      height: 20px;
      background: ${p.theme.colors.primary};
      position: absolute;
      left: 0;
      top: 0;
      transition: ${p.theme.colorModeTransition};
    }

    &::after {
      content: "";
      width: 100%;
      height: 10px;
      background: ${p.theme.colors.background};
      position: absolute;
      left: 0;
      top: 10px;
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
      transition: ${p.theme.colorModeTransition};
    }
  `}
`;

const ArticleMeta = styled.div`
  margin-left: 0;

  ${mediaqueries.phablet`
    margin-left: 0;
  `}
`;

const Header = styled.header`
  position: relative;
  z-index: 10;
  margin:100px auto 120px;
  padding-left: 68px;
  max-width: 749px;

  ${mediaqueries.desktop`
    padding-left: 53px;
    max-width: calc(507px + 53px);
    margin: 100px auto 70px;
  `}

  ${mediaqueries.tablet`
    padding-left: 0;
    margin: 100px auto 70px;
    max-width: 480px;
  `}

  ${mediaqueries.phablet`
    margin: 170px auto 180px;
    padding: 0 40px;
  `}

  @media screen and (max-height: 700px) {
    margin: 100px auto;
  }
`;

const HeroTag = styled.div`
  margin-bottom: 12px;
`;

const Badge = styled(Link)`
  color: ${p => p.theme.colors.background};
  background-color: ${p => p.theme.colors.accent};
  padding: 4px 8px;
  margin-right: 8px;
  border-radius: 4px;
`;

const HeroHeading = styled(Headings.h1)`
  font-size: 48px;
  font-family: ${p => p.theme.fonts.serif};
  margin-bottom: 25px;
  font-weight: bold;
  line-height: 1.32;

  ${mediaqueries.tablet`
    margin-bottom: 20px;
    font-size: 36px;
  `}

  ${mediaqueries.phablet`
    font-size: 32px;
  `}
`;

const HeroSubtitle = styled.div`
  position: relative;
  display: flex;
  font-size: 18px;
  color: ${p => p.theme.colors.grey};

  ${p => mediaqueries.phablet`
    font-size: 14px;
    flex-direction: column;

    strong {
      display: block;
      font-weight: 500;
      margin-bottom: 5px;
    }
  `}
`;

const HeroImage = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 944px;
  overflow: hidden;
  margin: 0 auto;
  box-shadow: 0 30px 60px -10px rgba(0, 0, 0, 0.2),
    0 18px 36px -18px rgba(0, 0, 0, 0.22);

  ${mediaqueries.tablet`
    max-width: 100%;
  `}

  ${mediaqueries.phablet`
    margin: 0 auto;
    width: calc(100vw - 40px);
    height: 220px;

    & > div {
      height: 220px;
    }
  `}
`;

const HeroProvider = styled.div`
  width: 100%;
  margin-top: 20px;
  text-align: center;
  color: ${p => p.theme.colors.primary};

  & a {
    color: ${p => p.theme.colors.accent};
  }

  & a:hover {
    border-bottom: 1px solid ${p => p.theme.colors.accent};
  }
`;
