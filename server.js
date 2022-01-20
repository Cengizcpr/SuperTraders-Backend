const express = require("express"),
 app = express(),
 cors = require("cors"),
 basicAuth = require('./encryption-server/helpers/basic-auth'),
 errorHandler = require('./encryption-server/helpers/error-auth');
require("dotenv").config()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Use basic HTTP auth to secure the api
app.use(basicAuth);

//Global error handler
app.use(errorHandler);

const connectDB = require('./config/db');
//mongodb connection
connectDB();


//Route middlewares
const share = require('./routes/share');
const customer = require('./routes/customer');
const market = require('./routes/market');

app.use('/api/supertraders-share/v1.0/', share);
app.use('/api/supertraders-customer/v1.0/', customer);
app.use('/api/supertraders-market/v1.0/', market);

//Start server listen port
const port = 8002;
app.listen(port, () => {
  console.log(`Listening on the port ${port}`);
});