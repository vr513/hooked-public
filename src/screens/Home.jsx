import React , {useEffect, useState} from 'react'
import Profile from '../components/Home/Profile'
import ActionCenter from '../components/Home/ActionCenter'
import styles from '../css/Home.module.css'
import Conversations from './Conversations'
import PrivateRoute from '../shared/PrivateRoute.js'
import Loading from '../shared/Loading'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [showConversations , setShowConversations] = useState(false);
  const [activeConvUuid , setActiveConvUuid] = useState(null);
  const [localReg , setLocalReg] = useState(null);
  const [loading , setLoading] = useState(true);

  const {registered} = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    setLocalReg(registered);
    if(registered === false){
      nav("/register");
    }else{
      setLoading(false);
    }
  },[registered])

  const handleConversationChange = (changeUuid) => {
    setShowConversations(true);
    setActiveConvUuid(changeUuid);
  }

  if(loading){
    return(
      <Loading />
    )
  }
  

  return (
    <div className={styles.mainHome}>
      <Profile 
        handleConversationChange={handleConversationChange}
        activeConvUuid={activeConvUuid}
      />
      {showConversations ? (
        <div className={styles.conversationsContainer} >
            <Conversations activeConvUuid={activeConvUuid} />
        </div>
      ) : <ActionCenter />}
    </div>
  )
}

export default Home;