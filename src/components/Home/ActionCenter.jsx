import React, { useState, useEffect } from 'react'
import styles from '../../css/Home/ActionCenter.module.css'
import UserCard from './UserCard'
import { useAuth } from "../../contexts/AuthContext";
import { AiOutlineCheck } from 'react-icons/ai'
import { ImCross } from 'react-icons/im'
import axios from '../../axiosConfig'
import { useChat } from '../../contexts/ChatContext';

const ActionCenter = () => {
  const token = localStorage.getItem('token');

  const [matchCardsArray, setMatchCardsArray] = useState([]);
  const [currentCard, setCurrentCard] = useState(null)

  const { registered, userData, RefreshMatches } = useAuth();
  const { createDocument } = useChat();

  const getUsers = async () => {
    let headersList = {
      Authorization: "JWT " + token,
    };
    let bodyContent = {
      age_limit_lower: userData.age_limit_lower,
      age_limit_upper: userData.age_limit_upper,
      match_gender_preference: userData.match_gender_preference,
    };
    let reqOptions = {
      url: "/get-users",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };
    let response = await axios.request(reqOptions);
    console.log(response.data)
    setMatchCardsArray(response.data.data)
    if (response.data.data.length != 0) {
      setCurrentCard(response.data.data[0])
    }
  };

  const likeUser = async () => {
    let headersList = {
      Authorization: "JWT " + token,
    };
    let bodyContent = {
      targetUser: currentCard.id
    };
    let reqOptions = {
      url: "/like",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };
    let response = await axios.request(reqOptions);
    const likesToMe = JSON.parse(userData.likestome);
    const isUserMatch = likesToMe.find((uuid) => {
      return uuid === currentCard.id
    })
    if (isUserMatch !== undefined) {
      await createDocument(currentCard.id);
      RefreshMatches();
    }
    if (matchCardsArray.length !== 1) {
      setCurrentCard(matchCardsArray[1]);
    } else setCurrentCard(null);

    setMatchCardsArray(matchCardsArray.slice(1));
  }


  const dislikeUser = async () => {
    let headersList = {
      Authorization: "JWT " + token,
    };
    let bodyContent = {
      targetUser: currentCard.id
    };
    let reqOptions = {
      url: "/dislike",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };
    let response = await axios.request(reqOptions);
    if (matchCardsArray.length !== 1) {
      setCurrentCard(matchCardsArray[1]);
    } else setCurrentCard(null);
    setMatchCardsArray(matchCardsArray.slice(1));
  }

  useEffect(() => {
    try {
      getUsers();
    } catch (err) { }
  }, []);

  return (
    <>
      <div className={styles.mainAction}>
        <div className={styles.cardContainer} >
          {currentCard !== null ? (
            <UserCard
              name={currentCard.username}
              age={currentCard.age}
              college_name={currentCard.college_name}
              grad_year={currentCard.grad_year}
              pictureSrc={currentCard.picture}
            />
          ) : "No User available"}
        </div>
        <div className={styles.ActionRow} >
          <div className={styles.iconContainer} onClick={likeUser} >
            <AiOutlineCheck className={styles.actionIcon1} />
          </div>
          <div className={styles.iconContainer} onClick={dislikeUser}>
            <ImCross className={styles.actionIcon2} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ActionCenter