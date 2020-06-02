const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT =  process.env.PORT || 8000;
const {MONGO_URI} = require('./config/keys');


mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true });
console.log('connected to database');
    mongoose.connection.on('connected', () => {
})
mongoose.connection.on('error', (error) => {
    console.log('error', error);
})

require('./models/user');
require('./models/post');

app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log('server is running on', PORT);
})