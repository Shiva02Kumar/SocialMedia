const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')
const { default: mongoose } = require('mongoose');
const authRouter = require('./routes/AuthRouter');
const chatRouter = require('./routes/ChatRouter');
const messageRouter = require('./routes/MessageRouter');

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const mongoUrl = process.env.MONGO_CONNECT;

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(mongoUrl)
      .then(() => {
        console.log('MongoDB connected...');
      })
      .catch((err) => {
        console.log('MongoDB Connection Error', err);
      })
  } catch (error) {
    console.log('MongoDB Connection Error', error);
  }
}


app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser())

app.use('/auth', authRouter);
app.use('/chats', chatRouter)
app.use('/messages', messageRouter)

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  })
}
else {
  app.get("/", (req, res) => {
    res.send("API is running successfully")
  })
}


connectDb();

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
})