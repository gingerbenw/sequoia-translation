import React, { useState } from 'react';
import { InlineText } from 'react-tinacms-inline';
import styles from './Header.module.scss';
import dynamic from 'next/dynamic';
import classNames from 'classnames';

import useFieldName from '../../lib/useFieldName';
import LanguageSelect from '../LanguageSelect';
import formatLink from '../../lib/formatLink';

// Dynamic import to allow use of global window variable
const NavBar = dynamic(() => import('../NavBar'), { ssr: false });

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);
  const { getFieldName } = useFieldName();

  return (
    <header className={styles.header}>
      <div className={styles.header_inner}>
        <h1 className={styles.title}>
          <InlineText name={'title'} />
        </h1>
        <NavBar toggleMenu={toggleMenu} />
      </div>
      <div
        className={classNames(styles.dropdown, {
          [styles.open]: showMenu
        })}
      >
        <div className={styles.dropdown_menu}>
          <nav className={styles.nav}>
            <ul className={styles.menu}>
              <a
                href={formatLink(getFieldName('servicesTitle'))}
                onClick={toggleMenu}
              >
                <li>
                  <InlineText name={getFieldName('servicesTitle')} />
                </li>
              </a>
              <a
                href={formatLink(getFieldName('aboutTitle'))}
                onClick={toggleMenu}
              >
                <li>
                  <InlineText name={getFieldName('aboutTitle')} />
                </li>
              </a>
              <a
                href={formatLink(getFieldName('contactTitle'))}
                onClick={toggleMenu}
              >
                <li>
                  <InlineText name={getFieldName('contactTitle')} />
                </li>
              </a>
            </ul>
            <LanguageSelect />
          </nav>
        </div>
      </div>
    </header>
  );
};
