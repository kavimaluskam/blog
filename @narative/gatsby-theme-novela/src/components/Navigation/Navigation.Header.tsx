import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { useColorMode } from 'theme-ui';

import Section from '@components/Section';

import Icons from '@icons';
import mediaqueries from '@styles/media';

const siteQuery = graphql`
  {
    site {
      siteMetadata {
        name
        header {
          navigation {
            label
            url
          }
        }
      }
    }
  }
`;

const DarkModeToggle: React.FC<{}> = () => {
  const [colorMode, setColorMode] = useColorMode();
  const isDark = colorMode === `dark`;

  function toggleColorMode(event) {
    event.preventDefault();
    setColorMode(isDark ? `light` : `dark`);
  }

  return (
    <IconWrapper
      isDark={isDark}
      onClick={toggleColorMode}
      data-a11y="false"
      aria-label={isDark ? 'Activate light mode' : 'Activate dark mode'}
      title={isDark ? 'Activate light mode' : 'Activate dark mode'}
    >
      <MoonOrSun isDark={isDark} />
      <MoonMask isDark={isDark} />
    </IconWrapper>
  );
};

const NavigationHeader: React.FC<{ pathname: string; hasLogo: boolean }> = ({
  pathname,
  hasLogo = false,
}) => {
  const [menuToggled, setMenuToggled] = useState<boolean>(false);
  const {
    site: {
      siteMetadata: {
        name,
        header: { navigation },
      },
    },
  } = useStaticQuery(siteQuery);

  const [colorMode] = useColorMode();
  const fill = colorMode === 'dark' ? '#fff' : '#000';

  return (
    <Section>
      <NavContainer>
        <LogoLink
          to="/"
          data-a11y="false"
          title="Navigate back to the homepage"
          aria-label="Navigate back to the homepage"
        >
          {hasLogo && name}
          <Hidden>Navigate back to the homepage</Hidden>
        </LogoLink>
        <Hamburger
          aria-label="Menu Toggle"
          onClick={e => setMenuToggled(!menuToggled)}
        >
          <Icons.Hamburger fill={fill} />
        </Hamburger>
        <NavControls className={menuToggled ? 'menu-toggled' : ''}>
          <NavbarLinksContainer>
            {navigation.map(({ url, label }, index) => {
              return (
                <NavLink
                  key={index}
                  to={url}
                  activeClassName={pathname == url ? 'active' : ''}
                  data-a11y="false"
                  title={label}
                  aria-label={label}
                >
                  {label}
                </NavLink>
              );
            })}
          </NavbarLinksContainer>

          <NavControlsSettings>
            <DarkModeToggle />
          </NavControlsSettings>
        </NavControls>
      </NavContainer>
    </Section>
  );
};

export default NavigationHeader;

const BackArrowIconContainer = styled.div`
  transition: 0.2s transform var(--ease-out-quad);
  opacity: 0;
  padding-right: 30px;
  animation: fadein 0.3s linear forwards;

  @keyframes fadein {
    to {
      opacity: 1;
    }
  }

  ${mediaqueries.desktop_medium`
    display: none;
  `}
`;

const NavContainer = styled.div`
  position: relative;
  z-index: 100;
  padding-top: 100px;
  display: flex;
  justify-content: space-between;

  ${mediaqueries.desktop_medium`
    padding-top: 50px;
  `};

  @media screen and (max-height: 800px) {
    padding-top: 50px;
  }

  ${mediaqueries.tablet`
    flex-wrap: wrap;
  `}
`;

const LogoLink = styled(Link)<{ back: string }>`
  position: relative;
  display: flex;
  align-items: center;
  left: 0;
  ${mediaqueries.desktop_medium`
    left: 0
  `}

  ${mediaqueries.tablet`
    max-width: 70%;
  `}
  color: ${p => p.theme.colors.grey};
  font-size: 20px;
  &:hover {
    color: ${p => p.theme.colors.primary};
  }
  &.active {
    color: ${p => p.theme.colors.primary};
  }
`;

const Hamburger = styled.button`
  display: none;
  svg {
    height: 30px;
    width: 20px;
  }
  ${mediaqueries.tablet`
    display: block;
    padding: 0 8px;
  `}
`;

const NavControls = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;

  ${mediaqueries.tablet`
    padding: 20px 8px;
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: start;
    display: none;
    &.menu-toggled {
      display: flex
    }
  `}
`;

const NavbarLinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-right: auto;
  margin-left: 60px;
  margin-top: 3px;
  margin-bottom: 3px;
  ${mediaqueries.tablet`
    margin-left: 0;
    margin-top: 3px;
    margin-bottom: 20px;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
  `}
`;

const NavLink = styled(Link)`
  color: ${p => p.theme.colors.grey};
  margin-right: 32px;
  margin-top: 3px;
  margin-bottom: 3px;
  font-size: 18px;
  &:hover {
    color: ${p => p.theme.colors.primary};
  }
  &.active {
    color: ${p => p.theme.colors.primary};
  }
  ${mediaqueries.tablet`
    margin-right: 0;
    margin-bottom: 20px;
  `}
`;

const NavControlsSettings = styled.div`
  display: flex;
  align-items: center;
  ${mediaqueries.tablet`
    width: 100%;
    justify-content: flex-end;
    margin-left: 10px;
  `}
`;

const IconWrapper = styled.button<{ isDark: boolean }>`
  opacity: 0.5;
  position: relative;
  border-radius: 5px;
  width: 40px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  margin-left: 30px;

  ${mediaqueries.desktop_up`
    zoom: 80%;
  `}

  &:hover {
    opacity: 1;
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: 0;
    top: -30%;
    width: 100%;
    height: 160%;
    border: 2px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${mediaqueries.tablet`
    display: inline-flex;
    transform: scale(0.708);
    margin-left: 10px;


    &:hover {
      opacity: 0.5;
    }
  `}
`;

// This is based off a codepen! Much appreciated to: https://codepen.io/aaroniker/pen/KGpXZo
const MoonOrSun = styled.div<{ isDark: boolean }>`
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: ${p => (p.isDark ? '4px' : '2px')} solid
    ${p => p.theme.colors.primary};
  background: ${p => p.theme.colors.primary};
  transform: scale(${p => (p.isDark ? 0.55 : 1)});
  transition: all 0.45s ease;
  overflow: ${p => (p.isDark ? 'visible' : 'hidden')};

  &::before {
    content: '';
    position: absolute;
    right: -9px;
    top: -9px;
    height: 24px;
    width: 24px;
    border: 2px solid ${p => p.theme.colors.primary};
    border-radius: 50%;
    transform: translate(${p => (p.isDark ? '14px, -14px' : '0, 0')});
    opacity: ${p => (p.isDark ? 0 : 1)};
    transition: transform 0.45s ease;
  }

  &::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: -4px 0 0 -4px;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0 -23px 0 ${p => p.theme.colors.primary},
      0 23px 0 ${p => p.theme.colors.primary},
      23px 0 0 ${p => p.theme.colors.primary},
      -23px 0 0 ${p => p.theme.colors.primary},
      15px 15px 0 ${p => p.theme.colors.primary},
      -15px 15px 0 ${p => p.theme.colors.primary},
      15px -15px 0 ${p => p.theme.colors.primary},
      -15px -15px 0 ${p => p.theme.colors.primary};
    transform: scale(${p => (p.isDark ? 1 : 0)});
    transition: all 0.35s ease;

    ${p => mediaqueries.tablet`
      transform: scale(${p.isDark ? 0.92 : 0});
    `}
  }
`;

const MoonMask = styled.div<{ isDark: boolean }>`
  position: absolute;
  right: -1px;
  top: -8px;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  border: 0;
  background: ${p => p.theme.colors.background};
  transform: translate(${p => (p.isDark ? '14px, -14px' : '0, 0')});
  opacity: ${p => (p.isDark ? 0 : 1)};
  transition: ${p => p.theme.colorModeTransition}, transform 0.45s ease;
`;

const Hidden = styled.span`
  position: absolute;
  display: inline-block;
  opacity: 0;
  width: 0px;
  height: 0px;
  visibility: hidden;
  overflow: hidden;
`;
