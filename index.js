const express = require('express');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt') 
const database = require('./function')
const cookieParser = require('cookie-parser')
const auth = require('./Authentification/auth')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path')

app.use(cookieParser())
app.use(express.static('Template'))
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'./Template/HTML/main.html'));
});

app.get('/login',(req,res)=>{
  res.sendFile(path.join(__dirname,'./Template/HTML/login.html'))
})

app.get('/signup',(req,res)=>{
  res.sendFile(path.join(__dirname,'./Template/HTML/register.html'))
})

const users = {}

io.on('connection', socket=>{
    socket.on('new-user-joined', name =>{
        users[socket.id] = name
        socket.broadcast.emit('user-joined',name)
    })
    
    socket.on('send', message=>{
        socket.broadcast.emit('recieve',{message:message, name: users[socket.id]})
    })

    socket.on('disconnect', message=>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id]
    })
})

app.get('/logout', auth, async (req,res)=>{
  try {
      req.user.Tokens = req.user.Tokens.filter((elem)=>{
          return elem.Token != req.token
      })

      res.clearCookie("jwt")
      await req.user.save()
      res.sendFile(path.join(__dirname,"./Template/HTML/login.html"))
  } catch (error) {
      console.log("error")
  }
})

app.post('/upload', async (req,res)=>{
  try {

      const hash = await bcrypt.hash(req.body.upass, 10)
      const obj = new database({
          Name:req.body.uname,
          Phone:req.body.unumber,
          Email:req.body.uemail,
          Password:hash
      })

      const result = await obj.save()
      console.log(result)
      res.sendFile(path.join(__dirname,"./Template/HTML/login.html"))
  } catch (error) {
      console.log(error)
  }

})

app.get('/login',(req,res)=>{
  res.sendFile(path.join(__dirname,"./Template/HTML/login.html"))
})

app.post('/check', async (req,res)=>{

  try {
      let email = req.body.uemail
      let pass = req.body.upass

      const result = await database.findOne({Email:email})
      const realPass = await bcrypt.compare(pass,result.Password)

      const token = await result.getAuthtokens()
      res.cookie("jwt",token,{
          httpOnly:true
      })
      if(realPass === true){
          res.sendFile(path.join(__dirname,"./Template/HTML/chat.html"))
      }
      else{
          
          res.sendFile(path.join(__dirname,"./Template/HTML/login.html"))
      }
      
  } catch (error) {
      console.log(error)
  }


})
server.listen(3000, () => {
  console.log('listening on *:3000');
});