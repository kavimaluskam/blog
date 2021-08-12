import React from 'react';
import styled from '@emotion/styled';

import Section from '@components/Section';
import SEO from '@components/SEO';
import Layout from '@components/Layout';
import Paginator from '@components/Navigation/Navigation.Paginator';

import { Template } from '@types';
import TagHero from '../sections/tag/Tag.Hero';
import ArticlesList from '../sections/articles/Articles.List';

const TagPage: Template = ({ location, pageContext }) => {
  const tag = pageContext.additionalContext.tag;
  const articles = pageContext.group;

  return (
    <Layout pathname={location.pathname}>
      <SEO pathname={location.pathname} />
      <TagHero tag={tag} />
      <Section narrow>
        <ArticlesList articles={articles} />
        <TagPaginator show={pageContext.pageCount > 1}>
          <Paginator {...pageContext} />
        </TagPaginator>
      </Section>
      <TagGradient />
    </Layout>
  );
};

export default TagPage;

const TagGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 590px;
  z-index: 0;
  pointer-events: none;
  background: ${p => p.theme.colors.gradient};
  transition: ${p => p.theme.colorModeTransition};
`;

const TagPaginator = styled.div<{ show: boolean }>`
  text-align: center;
`;
