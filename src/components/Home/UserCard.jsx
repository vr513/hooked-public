import React from 'react'
import styles from '../../css/Home/UserCard.module.css'
import { Image } from 'react-bootstrap'
import tinImg from "../../assets/tin.jpg"

function UserCard({ name, age, college_name, grad_year, pictureSrc }) {
  return (
    <div className={`${styles.mainUserCard}`}>
      <div className={styles.userImg}>
        <Image src={pictureSrc} fluid className={styles.userImageRef} />
      </div>
      <div className={styles.userText}>{name} , {age}
        <div className={styles.userTextInfo}>{college_name} {grad_year}</div>

      </div>
    </div>
  )
}

export default UserCard;