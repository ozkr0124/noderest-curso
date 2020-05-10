require('./config/config');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(require('./routes/usuario'));

let conn = async() => {
    let db = await mongoose.connect(process.env.URLDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return db;
}

conn().then(res => {
    console.log('Conexion DB ONLINE');
}).catch(e => {
    console.log('Error en la conexion', e);
});

app.listen(process.env.PORT, () => {
    console.log(`Puerto ${process.env.PORT}`);
})