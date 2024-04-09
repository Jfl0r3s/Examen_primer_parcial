const mongoose = require('mongoose');

const ventaMuebleSchema = new mongoose.Schema({
    tipo: String,
    material: String,
    precio: Number,
    fechaVenta: Date,
    cliente: {
        nombre: String,
        correo: String,
        telefono: String
    }
});


const VentasModel = mongoose.model('Ventas',ventaMuebleSchema,'ventas');
module.exports=VentasModel;