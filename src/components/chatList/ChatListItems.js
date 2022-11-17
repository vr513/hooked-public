import React, { Component } from "react";
import Avatar from "./Avatar";

const ChatListItems = ({
  name,
  image,
  animationDelay,
  handleViewChange,
  uid,
}) => {
  return (
    <div
      style={{ animationDelay: `0.${animationDelay}s` }}
      onClick={() => handleViewChange(uid)}
      className={`chatlist__item`}
    >
      <Avatar pictureSrc={image ? image : "http://placehold.it/80x80"} />

      <div className="userMeta">
        <p>{name}</p>
        {/* <span className="activeTime">32 mins ago</span> */}
      </div>
    </div>
  );
};
export default ChatListItems;
