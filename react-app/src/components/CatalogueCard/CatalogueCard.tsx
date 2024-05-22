import React from 'react';
import styles from './CatalogueCard.module.css';

interface CatalogueCardProps {
  ribbonText?: string;
  imageSrc: string;
  title: string;
  rows: number;
  description: string;
  onMoreInfo: () => void;
}

const CatalogueCard: React.FC<CatalogueCardProps> = ({
  ribbonText,
  imageSrc,
  title,
  rows,
  description,
  onMoreInfo,
}) => {
  return (
    <div className={styles.catalogueWrapper}>
      {ribbonText && (
        <div className={styles.ribbonWrapper}>
          <span className={styles.ribbonChild}>
            <span>{ribbonText}</span>
          </span>
        </div>
      )}
      <div className={`${styles.card} ${styles.cardHoverable}`}>
        <div className={styles.cardCover}>
          <img
            alt={title}
            src={imageSrc}
            className={styles.cardImage}
          />
        </div>
        <div className={styles.cardBody}>
          <div className={styles.cardMeta}>
            <div className={styles.cardMetaDetail}>
              <div className={styles.cardMetaTitle}>{title}</div>
            </div>
          </div>
          <div className={styles.metaDataWrapper}>
            <span className={styles.catalogueRow}>{rows} rows</span>
            <p className={styles.catalogueDesc}>{description}</p>
          </div>
        </div>
        <ul className={styles.cardActions}>
          <li className={styles.actionItem}>
            <span onClick={onMoreInfo} className={styles.moreInfo}>
              More Info
              <span role="img" aria-label="info-circle" className="anticon anticon-info-circle">
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="info-circle"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                  <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                </svg>
              </span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CatalogueCard;
