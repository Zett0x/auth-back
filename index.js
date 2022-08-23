const express = require('express');
const cors=require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();


const app=express();

//DB CONNECTION 
dbConnection();


const PORT= process.env.PORT ||  4000;


// DIRECTORIO PUBLICO

app.use(express.static('public'));


//Lectura y parseo del body

app.use(express.json());


//rutas
app.use('/api/auth', require('./routes/auth'));


//CORS
app.use(cors());


console.log('Server starting...');
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})