const { response } = require('express');
const { CleaningInventorySchema, ProductExpenseSchema } = require('../../models');

const getCleaningInventory = async (req, res = response) => {

    const CleaningInventory = await CleaningInventorySchema.find({state : true})
        .select('units')
        .select('description')
        .select('date')
        .select('cost')
        .populate('productExpense' , 'name')
        
    res.json({
        ok: true,
        CleaningInventory
    });
}

const createCleaningInventory = async (req, res = response) => {

    const CleaningInventory = new CleaningInventorySchema(req.body);
    try {

        const product_cost = await ProductExpenseSchema.findById(CleaningInventory.productExpense).select('cost');

        CleaningInventory.cost = product_cost.cost * CleaningInventory.units;
        CleaningInventory.date = new Date();

        const cleaningInventorySave = await CleaningInventory.save();
        const cleaningInventoryWithRef = await CleaningInventorySchema.findById(cleaningInventorySave.id)
            .select('units')
            .select('description')
            .select('date')
            .select('cost')
            .populate('productExpense', 'nameProduct units cost description')

        res.json({
            ok: true,
            Inventario: cleaningInventoryWithRef
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

        const newInventary = {
            ...req.body
        }

        const InventaryUpdate = await CleaningInventorySchema.findByIdAndUpdate(InventoryId, newInventary, { new: true });

        const InventaryWithRef = await CleaningInventorySchema.findById(InventaryUpdate.id)
            .select('units')
            .select('description')
            .select('date')
            .populate('productExpense', 'name')
		;

        res.json({
            ok: true,
            inventary: InventaryWithRef
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
        
        const newInventory = { ...inventory }
        newInventory._doc.state = false;

        const inventoryDelete = await CleaningInventorySchema.findByIdAndUpdate(inventoryId, newInventory, { new: true },);
        const inventoryWithRef = await CleaningInventorySchema.findById(inventoryDelete.id)
            .populate('productExpense', 'name')
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