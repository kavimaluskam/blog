import styled from '@emotion/styled';
import mediaqueries from '@styles/media';

const Blockquote = styled.blockquote`
  transition: ${p => p.theme.colorModeTransition};
  color: ${p => p.theme.colors.articleText};
  font-family: ${p => p.theme.fonts.serif};
  font-style: italic;

  & > p {
    padding: 0rem 2.5rem;
    box-shadow: inset 3px 0 0 0 ${p => p.theme.colors.accent};

    ${mediaqueries.phablet`
      font-size: 18px;
      width: calc(100% - 40px);
    `};
  }

  ${mediaqueries.tablet`
    margin: 10px auto 35px;
  `};
`;

export default Blockquote;
