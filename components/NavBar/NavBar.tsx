import React, { useState, useEffect } from 'react';
import styles from './NavBar.module.scss';
import useFieldName from '../../lib/useFieldName';
import { InlineText } from 'react-tinacms-inline';
import { MenuIcon } from '../Icons';
import LanguageSelect from '../LanguageSelect';

interface NavBarProps {
  toggleMenu: () => void;
}

const formatLink = (link: string) => '#' + link;

const mediaQuery = 'screen and (min-width: 768px)';

export const MobileNav: React.FC<NavBarProps> = ({ toggleMenu }) => (
  <nav className={styles.nav_mobile}>
    <MenuIcon onClick={toggleMenu} className={styles.icon} />
  </nav>
);

export const DesktopNav: React.FC<NavBarProps> = () => {
  const { getFieldName } = useFieldName();

  return (
    <nav className={styles.nav}>
      <ul className={styles.menu}>
        <a href={formatLink(getFieldName('servicesTitle'))}>
          <li>
            <InlineText name={getFieldName('servicesTitle')} />
          </li>
        </a>
        <a href={formatLink(getFieldName('aboutTitle'))}>
          <li>
            <InlineText name={getFieldName('aboutTitle')} />
          </li>
        </a>
        <a href={formatLink(getFieldName('contactTitle'))}>
          <li>
            <InlineText name={getFieldName('contactTitle')} />
          </li>
        </a>
      </ul>
      <LanguageSelect />
    </nav>
  );
};

export const NavBar: React.FC<NavBarProps> = (props) => {
  const mql = window.matchMedia(mediaQuery);
  const [showDesktopMenu, setShowDesktopMenu] = useState(mql.matches);

  useEffect(() => {
    const handleMediaChange = function () {
      setShowDesktopMenu(this.matches);
    };

    mql.addEventListener('change', handleMediaChange);
    setShowDesktopMenu(mql.matches);

    return () => mql.removeEventListener('change', handleMediaChange);
  }, [mql]);

  if (showDesktopMenu) {
    return <DesktopNav {...props} />;
  }

  return <MobileNav {...props} />;
};
