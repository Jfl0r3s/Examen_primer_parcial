const express = require('express');
const rutas = express.Router();
const VentasModel = require('../models/ventaMueble');

rutas.get('/', async (req, res) =>{
    try {
        const listaVentas = await VentasModel.find();
        //console.log(listaVentas);
        res.json(listaVentas);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

rutas.post('/agregar', async (req, res) =>{
    //console.log(req.body); 
        const nuevaVentas = await VentasModel({
            tipo: req.body.tipo,
            material: req.body.material,
            precio: req.body.precio,
            fechaVenta: req.body.fechaVenta,
            cliente: {
                nombre: req.body.nombre,
                correo: req.body.correo,
                telefono: req.body.telefono
             } 
        });
        try {
            const guardarVenta = await nuevaVentas.save();
            res.status(201).json(guardarVenta);
        } catch (error) {
            res.status(404).json({mensaje: error.message});
        }
});
rutas.put('/editar/:id', async (req, res) =>{
        try {
            const actualizarVenta = await VentasModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
            res.status(201).json(actualizarVenta);
        } catch (error) {
            res.status(404).json({mensaje: error.message});
        }
});
rutas.delete('/eliminar/:id', async (req, res) =>{
    try {
        const eliminarVenta = await VentasModel.findByIdAndDelete(req.params.id);
        res.json({mensaje: 'el registro se ha eliminado correctamente'});
    } catch (error) {
        res.status(404).json({mensaje: error.message});
    }
});

//Consultas
// Búsqueda de ventas de muebles por tipo específico
rutas.get('/ventas-por-tipo/:tipo', async (req, res) => {
    try {
        const ventasPorTipo = await VentasModel.find({ tipo: req.params.tipo });
        res.json(ventasPorTipo);
    } catch (error) {
        res.status(404).json({ mensaje: error.message });
    }
});
// Búsqueda de ventas por fecha
rutas.get('/ventas-por-fecha/:fechaVenta', async (req, res) => {
    try {
        const ventasPorFecha = await VentasModel.find({ fechaVenta: req.params.fechaVenta });
        res.json(ventasPorFecha);
    } catch (error) {
        res.status(404).json({ mensaje: error.message });
    }
});


// consulta de ventas por material
rutas.get('/ventas-por-material/:material', async (req, res) => {
    try {
        const ventasPorMaterial = await VentasModel.find({ material: req.params.material });
        res.json(ventasPorMaterial);
    } catch (error) {
        res.status(404).json({ mensaje: error.message });
    }
});




/////////////////////
module.exports=rutas;