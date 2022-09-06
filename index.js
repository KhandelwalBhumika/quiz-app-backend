require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieSession = require("cookie-session");
const path = require('path');

const app = express()

const usersRouter = require('./routes/user.routes')
const quizRouter = require('./routes/quiz.routes')

mongoose.connect(process.env.MONDODB_URL, {
    useNewUrlParser: true
})

const con = mongoose.connection

con.on('open', () => {
    console.log('connected..')
})

app.use(
    cookieSession({
        name: "session",
        keys: process.env.KEY,
        maxAge: 24 * 60 * 60 * 100 
    })
  );

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter)
app.use('/quiz', quizRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server started! on ${process.env.PORT}`)
})