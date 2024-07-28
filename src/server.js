import express from "express";
import WebSocket from "ws";
import http from "http";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname+"/views");
app.use("/public", express.static(__dirname+"/public"));
app.get("/", (req, res) => res.render("home"));

// 다른 주소로 들어오면 바로 리다렉해줌
app.get("/*", (req, res)=>res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);


// http랑 webSocket 둘 다 작동 시키는 것 (둘 다 돌리는 건 필수가 아님) -> same port에 서버를 돌리려고 이렇게 적음
const server = http.createServer(app);
// http 서버 위에 ws 서버를 만듦
const wss = new WebSocket.Server({server});

server.listen(3000, handleListen);