const express = require("express");
const { PORT } = require('./config/index');

const app = express();

app.use(express.json());

// Get all pics
app.get('/list', ((req, res) => {
    res.send('Hello world!');
}));

// Post pic
app.post('/upload', ((req, res) => {
    res.send('You just uploaded a picture');
}));



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})