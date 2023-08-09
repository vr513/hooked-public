import React, { Component, useEffect, useState } from "react";
import "./chatList.css";
import ChatListItems from "./ChatListItems";
import { Image } from "react-bootstrap";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../axiosConfig";

const ChatList = ({ handleViewChange }) => {
  const token = localStorage.getItem("token");

  const { Logout, userData, matchesData, RefreshMatches } = useAuth();

  const nav = useNavigate();

  const userLogout = () => {
    const res = Logout();
    if (res) {
      nav("/");
    }
  };

  useEffect(() => {
    RefreshMatches();
  }, []);

  return (
    <div className="main__chatlist">
      <div className="chatlist__header">
        <Link to={"/update-info"}>
          <div className={`userCont`}>
            <Image src={userData.picture} fluid className={`userImageRef`} />
            <h2 className={`userName`}>{userData.username}</h2>
          </div>
        </Link>
        <h2 className={`conversationsHeading`}>Your matches</h2>
      </div>
      <div className="chatlist__items">
        {matchesData.map((item, index) => {
          return (
            <ChatListItems
              name={item.username}
              key={item.id}
              animationDelay={index + 1}
              image={item.picture}
              handleViewChange={handleViewChange}
              uid={item.id}
            />
          );
        })}
      </div>
      <div className={"logout__container"}>
        <div className={`chatlist__logOut`} onClick={userLogout}>
          <FiLogOut className={`chatlist__logoutIcon`} />
          <h2 className={`chatlist__conversationsName`}>Logout</h2>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
