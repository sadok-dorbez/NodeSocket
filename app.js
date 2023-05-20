const express = require("express");
const http = require("http");
const path = require("path");
const ChatRouter = require("./routes/chat");
const mongoose = require("mongoose");
const dbconfig = require("./config/db.json");
const ClientRouter = require("./services/client");

const app = express();

// Set the static files directory
app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);

const io = require("socket.io")(server);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/chat.html"));
});

io.on('connection', (socket)=> {
    socket.on('chat message', msgObj => {
        io.emit('chat message', msgObj);
    });
    console.log ('User Connected');
    socket.emit("msg","A new user has been connected !");
    socket.on("disconnect",()=>{
        io.emit("msg","A user disconnected");
    })
    socket.on("keyup", msg =>{
        io.emit('keyup',msg);
    });

    socket.on("typing", data => {
        io.emit("typing", data);
    });
});

mongoose.connect(dbconfig.url , { useNewUrlParser : true , useUnifiedTopology: true }, () => console.log("connected to DataBase 🚀"));

server.listen(3000, () => console.log("server is running"));
app.use("/message", ChatRouter);
app.use("/client", ClientRouter);
