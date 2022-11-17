import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import ChatList from "../chatList/ChatList";
import ChatContent from "../chatContent/ChatContent";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "../../shared/Loading";
import ActionCenter from "../Home/ActionCenter";
import { useChat } from "../../contexts/ChatContext";

const Dashboard = () => {
  const [localReg, setLocalReg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConversations, setShowConversations] = useState(null);

  const { registered } = useAuth();
  const nav = useNavigate();
  const { createDocument, sendChat } = useChat();

  const handleViewChange = async (uid) => {
    if (uid !== showConversations) {
      setShowConversations(uid);
    } else setShowConversations(null);
  };

  useEffect(() => {
    setLocalReg(registered);
    if (registered === false) {
      nav("/register");
    } else {
      setLoading(false);
    }
  }, [registered]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="main__chatbody">
      <ChatList handleViewChange={handleViewChange} />
      <div className="main__chatContainer">
        {showConversations !== null ? (
          <ChatContent id={showConversations} />
        ) : (
          <ActionCenter />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
