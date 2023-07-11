const { response } = require('express');
const { CleaningInventorySchema } = require('../../models');

const getCleaningInventory = async (req, res = response) => {

    const CleaningInventory = await CleaningInventorySchema.find()
        .select('units')
        .select('description')
        .select('date')
        .populate('ProductsExpense' , 'nameProduct')
        
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

    const InventoryId = req.params.id;

    try {

        const nuevoInventario = {
            ...req.body
        }

        const InventarioActualizado = await CleaningInventorySchema.findByIdAndUpdate(InventoryId, nuevoInventario, { new: true },);

        const InventarioConReferencias = await ProductExpenseSchema.findById(InventarioActualizado.id)
            .select('units')
            .select('description')
            .select('date')
            .populate('ProductsExpense', 'nameProduct')
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

    const inventoryId = req.params.id;

    try {
        const inventory = await CleaningInventorySchema.findById(inventoryId)
        if (inventory.isSuperUser) {
            return res.status(400).json({
                ok: false,
                msg: 'No es posible eliminar a un super usuario'
            });
        }
        let newInventory = { ...inventoryId }
        newInventory._doc.state = false;

        const inventoryDelete = await CleaningInventorySchema.findByIdAndUpdate(inventoryId, newInventory, { new: true },);
        const inventoryWithRef = await CleaningInventorySchema.findById(inventoryDelete.id)
            .populate('ProductsExpense', 'nameProduct ')
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