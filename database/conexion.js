
require('dotenv').config();
const mongoose = require('mongoose');


const URL = process.env.MONGOATLAS;

const conexion = mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    // console.log(`Conexion exitosa a la base de datos -URL: ${URL}`);
});

mongoose.connection.on('error', () => {
    // console.log(`Error al conectar a la base de datos -URL: ${URL}`);
});


module.exports = conexion;

