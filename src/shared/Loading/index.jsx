import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
import styles from '../../css/shared/loading.module.css'

const Loading = ()  => {
  return (
    <div className={styles.loading}>
        <Spinner size='lg' className={styles.loadingIcon} animation="border" variant="light" />
        <h1 className={styles.loadingText}>Loading ...</h1>
      </div>
  )
}

export default Loading;