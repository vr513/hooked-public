import React, { createContext, useEffect, useContext, useState } from "react";
import { db } from "../shared/firebase";
import { useAuth } from "./AuthContext";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { ref, set , onValue , serverTimestamp , update , get } from "firebase/database";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [localChat , setLocalChat] = useState();

    const { userData } = useAuth();

    const createDocument = async (targetUserUid) => {
        const combinedId =
            userData.id > targetUserUid
                ? targetUserUid + "-" + userData.id
                : userData.id + "-" + targetUserUid;
        try {
            const res = await set(ref(db, 'chats/' + combinedId), {
                messageCount: 0
            });
            console.log(res);
        } catch (e) {
            console.error(e);
        }
    };

    const sendChat = async (targetUserUid, targetMessage) => {
        console.log("Inside Send Chat");
        const combinedId =
            userData.id > targetUserUid
                ? targetUserUid + "-" + userData.id
                : userData.id + "-" + targetUserUid;
        let chatRef = ref(db,'chats/'+combinedId);
        let snapshot = await get(chatRef);
        let data = snapshot.val();
        if(data === null || data === undefined){
            try {
                const res = await set(ref(db, 'chats/' + combinedId), {
                    messageCount: 0
                });
                snapshot = await get(chatRef);
                data = snapshot.val();
            } catch (e) {
                console.error(e);
            }
        }
        await set(ref(db, 'chats/' + combinedId  + `/messages/${data.messageCount}`), {
            senderId : userData.id,
            messageValue : targetMessage
        });
        await update(ref(db, 'chats/' + combinedId ) , {
            messageCount : data.messageCount + 1
        });
    }

    useEffect(() => {
        setLoading(false);
    }, []);

    const value = {
        createDocument,
        sendChat,
        localChat
    };

    return (
        <ChatContext.Provider value={value}>
            {!loading && children}
        </ChatContext.Provider>
    );
};

const useChat = () => {
    return useContext(ChatContext);
};

export { ChatContext, ChatProvider, useChat };
