const mqtt = require("mqtt");

class MqttClient {
    constructor(brokerUrl, options) {
        this.client = mqtt.connect(brokerUrl, options);

        this.client.on("connect", () => {
            console.log("Connected to MQTT broker");
        });

        this.client.on("error", (error) => {
            console.error("MQTT connection error:", error);
        });
    }

    publish(topic, message) {
        this.client.publish(topic, message);
    }

    subscribe(topic, callback) {
        this.client.subscribe(topic, (err) => {
            if (err) {
                console.error("Failed to subscribe to topic:", topic, err);
                return;
            }
            console.log("Subscribed to topic:", topic);

            this.client.on("message", (msgTopic, message) => {
                if (msgTopic === topic) {
                    callback(topic, message);
                }
            });
        });
    }
}

module.exports = MqttClient;
