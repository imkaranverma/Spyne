const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter')

require('dotenv').config();
require('./Modals/db');
const cors = require('cors');
const PORT = process.env.PORT || 8080;


app.get('/ping', (req, res) => {
    res.send("PONGG");
});

app.use(bodyParser.json());
app.use(cors())

app.use('/auth', AuthRouter);
app.use('/cars', ProductRouter);


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})