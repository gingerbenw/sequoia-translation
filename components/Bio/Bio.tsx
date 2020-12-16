import React from 'react';
import styles from './Bio.module.scss';

export interface BioProps {}

export const Bio: React.FC<BioProps> = () => {
  return <div className={styles.container}></div>;
};
