import React from 'react';
import styles from './Sales.module.css';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
const compareSales = (currentValue, previousValue) => {
    if (currentValue >= previousValue) {
        return 'sales-up';
    } else {
        return 'sales-down';
    }
}

const Sales = (props) => {
    const numberFormat = new Intl.NumberFormat('en-US');
    const upOrDownClass = compareSales(props.currentValue, props.previousValue);
  return (
    <div className={styles['sales-container']}>
            <span className={`material-icons material-symbols-outlined ${styles[upOrDownClass]}`}>
                {upOrDownClass=='sales-up' && <TrendingUpIcon/>}
                {upOrDownClass=='sales-down' && <TrendingDownIcon/>}
            </span>
            <span className={`${styles['sales-value']} ${styles[upOrDownClass]}`}>
                {numberFormat.format(props.currentValue)}k
            </span>
            <span className={styles['sales-title']}>
                {props.title}
            </span>
    </div>
  );
}

export default Sales