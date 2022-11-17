import React, { Component } from "react";
import Avatar from "../chatList/Avatar";

class ChatItem2 extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${this.props.user ? this.props.user : ""}`}
      >
        <div className="chat__item__content">
          <div className="chat__msg">{this.props.msg}</div>
          <div className="chat__meta">
            <span>16 mins ago</span>
            <span>Seen 1.03PM</span>
          </div>
        </div>
        <Avatar isOnline="active" image={this.props.image} />
      </div>
    );
  }
}

const ChatItem = ({ animationDelay, user, msg, image }) => {
  return (
    <div
      style={{ animationDelay: `0.8s` }}
      className={`chat__item ${user ? user : ""}`}
    >
      <div className="chat__item__content">
        <div className="chat__msg">{msg}</div>
        <div className="chat__meta">
          <span>16 mins ago</span>
          <span>Seen 1.03PM</span>
        </div>
      </div>
      <Avatar isOnline="active" pictureSrc={image} />
    </div>
  );
};

export default ChatItem;
