const express = require('express')
fs = require('fs');
const app = express()
const port = 3000
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));


var roomno = 1;


const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
	console.log(`a user connected with socket id : ${socket.id}`);

	socket.join("room-"+roomno);
	io.sockets.in("room-"+roomno).emit('connectToRoom', "You are in room no. "+roomno);

	socket.on('move', (msg) =>
  {
	  socket.broadcast.emit('move', msg)

  })
  
  socket.on('disconnect', () => {
    console.log(`user disconnected ${socket.id}`);
  });




});

var Player = 1

app.use('/node_modules', express.static(__dirname + "/node_modules"))
app.use('/img', express.static(__dirname + "/img"));
app.use('/picture', express.static(__dirname + "/picture"));
app.use('/js', express.static(__dirname + "/js"));
app.get("/", (req, res) => {


	//res.cookie('name', 'blackPlayer'); //Sets name = express

	

//	console.log(req.cookies)
	
	res.sendFile(__dirname + '/index.html');

});


server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


