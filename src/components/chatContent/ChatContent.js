import React, {
  Component,
  useState,
  createRef,
  useEffect,
  useRef,
} from "react";
import Loading from "../../shared/Loading";
import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import { useChat } from "../../contexts/ChatContext";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../shared/firebase";
import { onValue, ref } from "firebase/database";

const ChatContent = ({ id }) => {
  let key = 8;
  const chatItms = [
    {
      key: 1,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "Hi Tim, How are you?",
    },
    {
      key: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "I am fine.",
    },
    {
      key: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "What about you?",
    },
    {
      key: 4,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "Awesome these days.",
    },
    {
      key: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "Finally. What's the plan?",
    },
    {
      key: 6,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "what plan mate?",
    },
    {
      key: 7,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "I'm taliking about the tutorial",
    },
  ];

  const { matchesData, userData } = useAuth();

  const [currUser, setCurrUser] = useState(null);
  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const messagesEndRef = useRef(null);
  const messageRef = useRef();
  const { sendChat } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    console.log("We are here");
  };

  const handleSendChat = async () => {
    if (messageRef.current.value !== "") {
      await sendChat(id, messageRef.current.value);
      setMsg("");
    }
  };

  useEffect(() => {
    if (!loading) {
      window.addEventListener("keydown", (e) => {
        if (e.keyCode == 13) {
          handleSendChat();
        }
      });
      scrollToBottom();
    }
  }, [loading]);

  useEffect(() => {
    const chatUser = matchesData.find((usr) => usr.id === id);
    setCurrUser(chatUser);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    const combinedId =
      userData.id > id ? id + "-" + userData.id : userData.id + "-" + id;
    const chatRef = ref(db, "chats/" + combinedId + `/messages`);
    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      setChat(data);
      scrollToBottom();
    });
    return unsubscribe;
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="main__chatcontent">
      <div className="content__header">
        <div className="blocks">
          <div className="current-chatting-user">
            <Avatar pictureSrc={currUser.picture} />
            <p>{currUser.username}</p>
          </div>
        </div>

        <div className="blocks">
          <div className="settings">
            <button className="btn-nobg">
              <i className="fa fa-cog"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="content__body">
        <div className="chat__items">
          {chat &&
            chat.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={`${id}-${index}`}
                  user={itm.senderId === id ? "other" : "me"}
                  msg={itm.messageValue}
                  image={
                    itm.senderId === id ? currUser.picture : userData.picture
                  }
                />
              );
            })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="content__footer">
        <div className="sendNewMessage">
          <button className="addFiles">
            <i className="fa fa-plus"></i>
          </button>
          <input
            type="text"
            placeholder="Type a message here"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
            ref={messageRef}
          />
          <button
            onClick={handleSendChat}
            className="btnSendMsg"
            id="sendMsgBtn"
          >
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;
