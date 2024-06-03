class MessageHandler {
    constructor() {
        this.messagesByTopic = {};
    }

    addMessage(topic, user, text) {
        const message = {
            user,
            text,
            time: new Date().toISOString(),
        };
        if (!this.messagesByTopic[topic]) {
            this.messagesByTopic[topic] = [];
        }
        this.messagesByTopic[topic].push(message);
        return message;
    }

    getMessages(topic) {
        return this.messagesByTopic[topic] || [];
    }
}

module.exports = MessageHandler;
