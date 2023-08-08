const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

fs.readdirSync('./routes').forEach((routes) => {
    app.use('/', require(`./routes/${routes}`));
});

app.listen(3000, (err) => {
    if (err) return console.error(err);
    console.log('Server listening on Port', 3000);
});
