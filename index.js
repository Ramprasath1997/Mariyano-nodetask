// index.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const teamRoutes = require('./routes/team');
const resultRoutes = require('./routes/result');

const app = express();
app.use(bodyParser.json());

const dbURI = 'mongodb+srv://Ramprasath97:Ramprasath97@cricketcluster.xdoxf3w.mongodb.net/?retryWrites=true&w=majority&appName=cricketcluster'; // replace with your MongoDB connection string

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.use('/team', teamRoutes);
app.use('/result', resultRoutes);

const viewResultsRoutes = require('./routes/viewResults');
app.use('/view', viewResultsRoutes);

app.get('/', (req, res) => {
  res.send('Fantasy Cricket App');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
