const express = require('express');
const path = require('path');
const api = require('./api');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', api);

const PORT = 5009;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
