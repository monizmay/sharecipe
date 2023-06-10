const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const router = express.Router();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
var bodyParser = require('body-parser')
var http = require('http').Server(app)
var io = require('socket.io')(http)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
//const { MONGO_URL, PORT } = process.env;

const MONGO_URL = require("./config/keys").MONGO_URL;
const PORT = require("./config/keys").PORT;
//const Message = require("../Models/Message");




var Message = mongoose.model('Message', {
  name: String,
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  }
})

app.get('/recipe', (req, res) => {
  Message.find({}).then((messages) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.send(messages)
  }).catch((err) => {
      console.log('Error ', err)
  });
  
})

// router.get('/recipe', async (req, res) => {
//   try {
//     // Query the MongoDB database
//     const data = await Message.find();

//     // Send the data as a JSON response
//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });



app.post('/recipe', async (req, res) => {

  try {
      var message = new Message(req.body)   

      var savedMessage = await message.save()
  
      console.log(req.body)

      //var censored = await Message.findOne({message: 'badword'})
      
      // if(censored) {
      //     await Message.deleteOne({_id: censored.id})
      // } else 
      io.emit('message', req.body);
      res.sendStatus(200);

  } catch (error) {
      res.sendStatus(500);
      return console.error(error);
  } finally {
      console.log('Message post called');
  }

})

// io.on('connection', (socket) => {
//   console.log('new user connected')
// })



mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', '*');
//   next();
// });

app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);

//app.use("/messages", )