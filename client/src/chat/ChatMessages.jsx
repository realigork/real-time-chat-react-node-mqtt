import styles from "./ChatMessages.module.css";

export default function ChatMessages({ messages }) {
    if (!messages || messages.length < 1) {
        return false;
    }

    return (
        <div className={styles.chatMessages}>
            {messages.map((msg, index) => (
                <div key={index} className={styles.chatMessage}>
                    <div className={styles.chatMessageContent}>
                        <strong className={styles.chatMessageUser}>
                            {msg.user}:{" "}
                        </strong>
                        <span className={styles.chatMessageText}>
                            {msg.text}
                        </span>
                    </div>

                    <span className={styles.chatMessageDate}>
                        {new Date(msg.time).toLocaleTimeString()}
                    </span>
                </div>
            ))}
        </div>
    );
}
