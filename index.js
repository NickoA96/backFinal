const express = require('express');
require ('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer');
const PORT = process.env.PORT || 9000;
require ('./database/conexion');

const app = express();
const personaController = require('./controllers/personaController');



//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use (express.static(__dirname+'public'));
app.use(cors());
app.use(morgan('common'));



//configuracion de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file);
        cb(null, __dirname + '/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

//pasamos la cfg a multer
const uploads = multer({storage: storage});



//rutas

app.get('/', async (req, res) => {
    res.json ({
        personas : await personaController.findAll()});
});

app.post('/crear', async (req, res) => {
    const {nombre, apellido, dni} = req.body;
    console.log(`${nombre} ${apellido} ${dni}`);

    await personaController.create(req.body)
    res.send('Persona Creada');
});

app.delete('/:id', async  (req, res) => {
    const {id} = req.params;
    console.log(id);
    await personaController.delete(id);

    res.send('Persona Eliminada');


});

app.put('/:id', async (req, res) => {
    //actualizar datos de una persona
    const {id} = req.params;
    
    res.send('Persona Actualizada');
});

app.get('/subir', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');

    
});


app.post ('/subir', uploads.single('archivo'), (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Por favor subir un archivo')
        error.httpStatusCode = 404
        return next(error)
    }

    res.send(`Archivo <b>${file.originalname}</b> subido con exito`);
});


app.listen(PORT, () => {
    // console.log(`Server running on port ${PORT}`);
});



