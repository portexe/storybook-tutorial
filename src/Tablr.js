import { useEffect } from 'react';
import styles from './tablr.module.css';
import PropTypes from 'prop-types';

export const Tablr = ({
  rows,
  headers,
  borderWidth = 'medium',
  cellPadding = 'medium',
  cellTextColor = 'black',
  headerTextColor = 'white',
  cellBorderColor = '#747381',
  headerBorderColor = '#494866',
  backgroundColor = '#a6a5b8',
  headerBackgroundColor = '#65647a',
}) => {
    // Handle errors with props.
  // 1. The header length must be at least 1
  // 2. The length of all of the rows must equal the header length
  useEffect(() => {
    if (headers.length < 1) {
      throw Error('Must have at least one header');
    } else if (!rows.every(r => r.length === headers.length)) {
      throw Error('Row length must equal header length');
    }
  }, [rows, headers]);

  const cellPaddingMap = {
    small: '3px',
    medium: '8px',
    large: '15px',
  };
  const borderWidthMap = {
    thin: '1px',
    medium: '2px',
    thick: '3px',
  };

  return (
    <div className={styles.main}>
    {headers.map((h, columnIndex) => (
      <div key={columnIndex} className={styles.column}>
        <div
          className={styles.header}
          style={{
            color: headerTextColor,
            padding: cellPaddingMap[cellPadding],
            backgroundColor: headerBackgroundColor,
            border: `${borderWidthMap[borderWidth]} solid ${headerBorderColor}`,
          }}
        >
          {h}
        </div>

        <div className={styles.rows}>
          {rows.map((r, rowIndex) => (
            <div
              key={rowIndex}
              className={styles.cell}
              style={{
                color: cellTextColor,
                backgroundColor: backgroundColor,
                padding: cellPaddingMap[cellPadding],
                border: `${borderWidthMap[borderWidth]} solid ${cellBorderColor}`,
              }}
            >
              {r[columnIndex]}
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
  );
};

Tablr.propTypes = {
  cellTextColor: PropTypes.string,
  headerTextColor: PropTypes.string,
  cellBorderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  headerBorderColor: PropTypes.string,
  headerBackgroundColor: PropTypes.string,
  borderWidth: PropTypes.oneOf(['thin', 'medium', 'thick']),
  cellPadding: PropTypes.oneOf(['small', 'medium', 'large']),
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};
