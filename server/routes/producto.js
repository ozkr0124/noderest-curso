const express = require('express');
const _ = require('underscore');

const { verificaToken } = require('../middlewares/autenticacion');

const app = express();

const Producto = require('../models/producto');


/* Obtener todos los productos */

app.get('/productos', verificaToken, (req, res) => {
    // Traer todos los productos
    // populate Usuario y categoria
    // Paginado

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Producto.find({ disponible: true })
        .skip(desde)
        .limit(limite)
        .populate('categoria', 'descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            Producto.countDocuments({ disponible: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    conteo,
                    productos
                });
            });

        });
});

/* Obtener un producto por id */

app.get('/productos/:id', verificaToken, (req, res) => {
    // populate Usuario y categoria
    let id = req.params.id;

    Producto.findById(id, (err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Id no encontrado'
                    }
                });
            }

            res.json({
                ok: true,
                producto: productoDB
            });
        })
        .populate('categoria', 'nombre descripcion')
        .populate('usuario', 'nombre email');
});

/* Buscar productos */
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {
    let termino = req.params.termino;

    let expreg = new RegExp(termino, 'i');

    Producto.find({ nombre: expreg })
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });
        });
})

/* Crear un producto*/

app.post('/productos', verificaToken, (req, res) => {
    // grabar Usuario y categoria del listado

    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        categoria: body.idCategoria,
        usuario: req.usuario._id,
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        })
    });

});

/* Actualizar un producto*/

app.put('/productos/:id', verificaToken, (req, res) => {
    // actualizar el producto
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion', 'categoria', 'disponible']);

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Id no existe'
                }
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    });
});

/* Eliminar (desactivar) un producto*/

app.delete('/productos/:id', verificaToken, (req, res) => {
    // desactivar el producto
    // cambiar disponible a false
    let id = req.params.id;
    let body = _.pick(req.body, ['disponible']);

    body.disponible = false;

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    });

});




module.exports = app;