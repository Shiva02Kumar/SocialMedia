const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser') 

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const authRouter = require('./routes/AuthRouter');
const productRouter = require('./routes/ProductRouter');

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
app.use(cookieParser())

app.use('/auth', authRouter);
app.use('/products', productRouter);


app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})