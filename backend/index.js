const express = require('express');
const appraisalRouter = require('./src/router/appraisal')
const adminRouter = require('./src/router/admin');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { verifyToken } = require('./src/middleware/auth');
const app = express();


app.use(cors()); 
app.use(bodyParser.json());

const mongoDB = "uri";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log("There is a problem while connecting to the database: " + err);
  });
  
app.get('/', (req, res) => {
  res.send('Welcome to the ABC Company Appraisal System API');
});

app.listen(8000, () => {
  console.log(`Server is running on http://localhost:${8000}`);
})

app.use('/appraisal', verifyToken,appraisalRouter);

app.use('/admin', verifyToken, adminRouter);
