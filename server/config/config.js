/* PUERTO ESCUCHA PRODUCCION/DESARROLLO */
process.env.PORT = process.env.PORT || 3000;

/* ENTORNO DE TRABAJO PRODUCCION/DESARROLLO */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/* VENCIMIENTO TOKEN */
process.env.EXP_TOKEN = '48h';

/* SEED TOKEN */
process.env.SEED = process.env.SEED || 'seed-developer';

/* BASE DE DATOS */
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/curso';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

/* Google Client_ID */
process.env.CLIENT_ID = process.env.CLIENT_ID || '545266656954-gm8brnfphecp62g6p76up36m7sedvvn3.apps.googleusercontent.com';