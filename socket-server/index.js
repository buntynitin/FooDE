const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http,{
    cors: {
      origin: '*',
    }
  })

  const port = process.env.PORT || 3000;

 


io.on('connection',  function(socket) {
    socket.on('join_room',({room_id}) =>{
        socket.join(room_id)
    })

    socket.on('sendLocation2server', (data) => {
        socket.to(data.room_id).emit('sendLocation2client',data)    
    });
});

http.listen(port)