const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre es necesario.'],
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es necesario.'],
    },
    idUsuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Id usuario es necesario.'],
    },
});

categoriaSchema.methods.toJSON = function() {
    let cat = this;
    let catObject = cat.toObject();
    return catObject;
};

categoriaSchema.plugin(uniqueValidator, { message: '{PATH} de la categoria debe de ser unico' });

module.exports = mongoose.model('Categoria', categoriaSchema);