import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import ChatMessages from "./ChatMessages";
import ChatNewMessage from "./ChatNewMessage";
import JoinChat from "./JoinChat";

import styles from "./Chat.module.css";

const SERVER_URL = "http://localhost:8000";

const socket = io(SERVER_URL, {
    withCredentials: true,
});

function Chat() {
    const [user, setUser] = useState(undefined);
    const [topic, setTopic] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (topic) {
            socket.emit("joinTopic", topic);

            const handleMessage = (newMessage) => {
                setMessages((prevMessages) => {
                    prevMessages = prevMessages || [];
                    return [...prevMessages, newMessage];
                });
            };

            const handleAllMessages = (allMessages) => {
                setMessages(allMessages);
            };

            socket.on("message", handleMessage);
            socket.on("allMessages", handleAllMessages);

            return () => {
                socket.off("message", handleMessage);
                socket.off("allMessages", handleAllMessages);
            };
        }
    }, [topic]);

    const sendMessage = () => {
        if (message.trim() && user) {
            socket.emit("message", { topic, user, text: message });
            setMessage("");
        }
    };

    const onChangeNewMessageHandler = (e) => {
        setMessage(e.target.value);
    };

    const onJoinChatHandler = ({ name, topic }) => {
        setUser(name);
        setTopic(topic);
    };

    if (!user) {
        return <JoinChat onJoin={onJoinChatHandler} />;
    }

    return (
        <div className={styles.chat}>
            <div className={styles.chatHeading}>
                <h2>{topic}</h2>
            </div>
            <ChatMessages messages={messages} />
            <ChatNewMessage
                message={message}
                onChange={onChangeNewMessageHandler}
                onAction={sendMessage}
            />
        </div>
    );
}

export default Chat;
