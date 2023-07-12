const { response } = require('express');
const { CleaningInventorySchema } = require('../../models');

const getCleaningInventory = async (req, res = response) => {

    const CleaningInventory = await CleaningInventorySchema.find()
        .select('units')
        .select('description')
        .select('date')
        .populate('productExpense' , 'nameProduct')
        
    res.json({
        ok: true,
        CleaningInventory
    });
}

const createCleaningInventory = async (req, res = response) => {

    const CleaningInventory = new CleaningInventorySchema(req.body);
    try {

        // Encriptar contraseña

        const cleaningInventoryGuardado = await CleaningInventory.save();
        const cleaningInventoryConReferencias = await CleaningInventorySchema.findById(cleaningInventoryGuardado.id)
            .select('units')
            .select('description')
            .select('date')
            .populate('productExpense', 'nameProduct units cost description')

        res.json({
            ok: true,
            Inventario: cleaningInventoryConReferencias
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const updateCleaningInventory = async (req, res = response) => {

    const InventoryId = req.query.id;

    try {

        const nuevoInventario = {
            ...req.body
        }

        const InventarioActualizado = await CleaningInventorySchema.findByIdAndUpdate(InventoryId, nuevoInventario, { new: true },);

        const InventarioConReferencias = await CleaningInventorySchema.findById(InventarioActualizado.id)
            .select('units')
            .select('description')
            .select('date')
            .populate('productExpense', 'nameProduct')
		;

        res.json({
            ok: true,
            Inventario: InventarioConReferencias
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const deleteCleaningInventory = async (req, res = response) => {

    const inventoryId = req.query.id;

    try {
        const inventory = await CleaningInventorySchema.findById(inventoryId)

        let newInventory = { ...inventory }
        newInventory._doc.state = false;

        const inventoryDelete = await CleaningInventorySchema.findByIdAndUpdate(inventoryId, newInventory, { new: true },);
        const inventoryWithRef = await CleaningInventorySchema.findById(inventoryDelete.id)
            .populate('productExpense', 'nameProduct ')
        res.json({
            ok: true,
            Inventario: inventoryWithRef
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
module.exports = {
    getCleaningInventory,
    createCleaningInventory,
    updateCleaningInventory,
    deleteCleaningInventory
}