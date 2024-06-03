import styles from "./ChatNewMessage.module.css";

export default function ChatNewMessage({ message, onChange, onAction }) {
    return (
        <div className={styles.chatNewMessage}>
            <input
                type="text"
                value={message}
                onChange={onChange}
                placeholder="Type your message..."
            />
            <button onClick={onAction}>Send</button>
        </div>
    );
}
