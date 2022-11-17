import React, { Component } from "react";

const Avatar = ({pictureSrc}) => {
  return (
    <div className="avatar">
      <div className="avatar-img">
        <img src={pictureSrc} alt="#" />
      </div>
    </div>
  );
}

export default Avatar;