process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/curso';
} else {
    urlDB = 'mongodb://cursos:abcd1234@ds263068.mlab.com:63068/cursoozkr0124';
}

process.env.URLDB = urlDB;