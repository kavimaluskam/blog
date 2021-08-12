import React from 'react';
import styled from '@emotion/styled';

import mediaqueries from '@styles/media';
import { ITag } from '@types';

interface TagHeroProps {
  tag: ITag;
}

const TagHero: React.FC<TagHeroProps> = ({ tag }) => {
  return (
    <Hero>
      <Heading>
        {tag.name} ({tag.count})
      </Heading>
    </Hero>
  );
};

export default TagHero;

const Hero = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 35px auto 110px;
`;

const Heading = styled.h1`
  font-size: 38px;
  font-family: ${p => p.theme.fonts.sansSerif};
  color: ${p => p.theme.colors.primary};
  margin-bottom: 15px;
  font-weight: var(--system-font-semibold);
  ${mediaqueries.tablet`
  `}
  ${mediaqueries.phablet`
  `}
`;
