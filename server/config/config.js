/* PUERTO ESCUCHA PRODUCCION/DESARROLLO */
process.env.PORT = process.env.PORT || 3000;

/* ENTORNO DE TRABAJO PRODUCCION/DESARROLLO */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/* VENCIMIENTO TOKEN */
process.env.EXP_TOKEN = 60 * 60 * 24 * 30;

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