import React from 'react'
import { Image } from 'react-bootstrap'
import icon from "../../assets/icon.jpg"
import icon3 from "../../assets/icon3.jpg"
import icon4 from "../../assets/icon4.jpg"
import icon5 from "../../assets/icon5.jpg"
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate , Link} from 'react-router-dom'
import styles from '../../css/Home/Profile.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import Loading from '../../shared/Loading'


const Profile = ({ handleConversationChange, activeConvUuid }) => {

  const { Logout, userData } = useAuth();
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);

  const userLogout = () => {
    const res = Logout();
    if (res) {
      nav("/");
    }
  };

  useEffect(() => {
    if (userData !== null && userData !== undefined) {
      setLoading(false);
    }
  }, [userData])

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className={styles.mainProfile}>
        <div className={`${styles.userCont} ${styles.clien}`}>
          <Image src={userData.picture} fluid className={styles.userImageRef} />
          <h2 className={styles.userName}>{userData.username}</h2>
        </div>
        <div className={styles.conversations}>
          <h2 className={styles.conversationsHeading}>Conversations (Recent)</h2>
          <div className={styles.userCont} onClick={() => handleConversationChange('Perrie')} >
            <Image src={icon3} fluid className={styles.userImageRef} />
            <h2 className={styles.conversationsName}>Perrie</h2>
          </div>
          <div className={styles.userCont} onClick={() => handleConversationChange('Anne')}>
            <Image src={icon4} fluid className={styles.userImageRef} />
            <h2 className={styles.conversationsName}>Anne</h2>
          </div>
          <div className={styles.userCont} onClick={() => handleConversationChange('Jade')}>
            <Image src={icon5} fluid className={styles.userImageRef} />
            <h2 className={styles.conversationsName}>Jade</h2>
          </div>
        </div>
        <div className={styles.logOut} onClick={userLogout} >
          <FiLogOut className={styles.logoutIcon} />
          <h2 className={styles.conversationsName}>Logout</h2>
        </div>
      </div>
    </>
  )
}

export default Profile