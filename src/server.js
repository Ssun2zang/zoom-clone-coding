import express from "express";
import WebSocket from "ws";
import http from "http";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname+"/views");
app.use("/public", express.static(__dirname+"/public"));
app.get("/", (_, res) => res.render("home"));

// 다른 주소로 들어오면 바로 리다렉해줌
app.get("/*", (_, res)=>res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);


// http랑 webSocket 둘 다 작동 시키는 것 (둘 다 돌리는 건 필수가 아님) -> 두 프로토콜이 same port에서 작동
const server = http.createServer(app);
// http 서버 위에 ws 서버를 만듦
const wss = new WebSocket.Server({server});

const onSocketClose = () => {
    console.log("Disconnected from the Browser ❌");
}

const sockets = [];

wss.on("connection", (socket) => {
    sockets.push(socket);
    console.log("Connected to Browser ✅")
    socket.on("close", onSocketClose);
    socket.on("message", (message) => {
        sockets.forEach(aSocket => aSocket.send(message.toString()));
    });
    socket.send("hello!!");
});

server.listen(3000, handleListen);