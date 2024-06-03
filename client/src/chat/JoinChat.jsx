import React, { useState } from "react";

import styles from "./JoinChat.module.css";

const predefinedTopics = ["General", "Documentation"];

function JoinChat({ onJoin }) {
    const [name, setName] = useState("");
    const [topic, setTopic] = useState(predefinedTopics[0]);

    const handleJoin = () => {
        if (name && topic) {
            onJoin({ name, topic });
        }
    };

    return (
        <div className={styles.joinChat}>
            <h1>Join Chat</h1>
            <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <select value={topic} onChange={(e) => setTopic(e.target.value)}>
                {predefinedTopics.map((topic, index) => (
                    <option key={index} value={topic}>
                        {topic}
                    </option>
                ))}
            </select>

            <div>
                <button onClick={handleJoin}>Join</button>
            </div>
        </div>
    );
}

export default JoinChat;
