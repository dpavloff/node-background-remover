const express = require("express");
const { PORT,  storageFolder } = require('./config/index');

const { apiRouter } = require('./router');

const app = express();

app.use(express.json());

app.use('/files', express.static(storageFolder));

app.use('/api', apiRouter);

app.get('/', (req, res) => res.json('Welcome to my app!'));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})