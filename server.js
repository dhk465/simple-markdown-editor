const express = require('express');
const mongoose = require('mongoose');
const api = require('./routes');

const app = express();

let conn = process.env.ATLAS;
if (conn == null || conn == "") {
  conn = 'mongodb://localhost:27017/notebook';
}

mongoose.connect(conn, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  dbName: 'notebook'
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to mongo'));

app.use(express.json());
app.use(express.static('public'));
app.use('/api', api);
app.get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => console.log("Server is listening on port %s", port));
