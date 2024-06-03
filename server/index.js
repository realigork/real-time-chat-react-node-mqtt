const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const MessageHandler = require("./MessageHandler");
const MqttClient = require("./MqttClient");

const CLIENT_URL = "http://localhost:3000";
const MQTT_API = "mqtt://mqtt.flespi.io";
const MQTT_TOKEN =
    "w47oaDExTFCAJTYXMyzldrmferSvCkikx7ufP4V4PXDnSeBIx066Cxh1OPvbXGQr";

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: CLIENT_URL,
        methods: ["GET", "POST"],
        credentials: true,
    },
});

app.use(
    cors({
        origin: CLIENT_URL,
        credentials: true,
    })
);

const messageHandler = new MessageHandler();
const mqttClient = new MqttClient(MQTT_API, { username: MQTT_TOKEN });

const topics = ["general", "documentation"];
topics.forEach((topic) => {
    mqttClient.subscribe(topic, (topicMsg, message) => {
        const messageObj = JSON.parse(message.toString());
        messageHandler.addMessage(topicMsg, messageObj.user, messageObj.text);
        io.to(topicMsg).emit("message", messageObj);
    });
});

io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("joinTopic", (topic) => {
        socket.join(topic);
        const messages = messageHandler.getMessages(topic);
        socket.emit("allMessages", messages);
    });

    socket.on("message", ({ topic, user, text }) => {
        const message = messageHandler.addMessage(topic, user, text);
        mqttClient.publish(topic, JSON.stringify(message));
        io.to(topic).emit("message", message);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
