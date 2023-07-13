const {response} = require('express');
const {InventoryDentistSchema, ProductExpenseSchema} = require('../../models');

const getInventoryDentist = async (req, res = response) => {
    
        try {
            const inventoryDentist = await InventoryDentistSchema.find({state : true})
                .select('cost')
                .select('units')
                .populate('appoitment','appoitmentDate')
                .populate('product','name')
            ;
            
            res.json({
                ok: true,
                inventoryDentist
            });
    
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
    }
 }

 const createInventoryDentist = async (req, res = response) => {

    const inventoryDentist = new InventoryDentistSchema(req.body);
    try {

        const product_cost = await ProductExpenseSchema.findById(inventoryDentist.product).select('cost');
        
        inventoryDentist.cost = product_cost.cost * inventoryDentist.units;        

        const inventaryDentistaSave = await inventoryDentist.save();
        const inventaryWithRef = await InventoryDentistSchema.findById(inventaryDentistaSave.id)
            .select('cost')
            .select('units')
            .populate('appoitment', 'appoitmentDate')
            .populate('product', 'name')
        ;
        res.json({
            ok: true,
            Inventario: inventaryWithRef
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const updateInventoryDentist = async (req, res = response) => {
    const inventoryDentistId = req.query.id;

    try {

        const newInventoryDentist = {
            ...req.body
        }

        const inventoryUpdate = await InventoryDentistSchema.findByIdAndUpdate(
            inventoryDentistId,
            newInventoryDentist,
            {new: true}
        );
        const inventaryWithRef = await InventoryDentistSchema.findById(inventoryUpdate.id)
            .select('cost')
            .select('units')
            .select('state')
            .populate('appoitment', 'appoitmentDate')
            .populate('product', 'name')
        ;

        res.json
        ({
            ok: true,
            inventory: inventaryWithRef
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const deleteInventoryDentist = async (req, res = response) => {

    const InventoryDentistId = req.query.id;

    try {
        const inventoryDentist = await InventoryDentistSchema.findById(InventoryDentistId)

        const newInventoryDentist = { ...inventoryDentist }
        newInventoryDentist._doc.state = false;

        const inventoryDentistDelete = await InventoryDentistSchema.findByIdAndUpdate(InventoryDentistId, newInventoryDentist, { new: true });
        const InventoryDentWithRef = await InventoryDentistSchema.findById(inventoryDentistDelete.id)
            .populate('appoitment', 'appoitmentDate')
            .populate('product', 'name')
        ;

        res.json({
            ok: true,
            Inventario: InventoryDentWithRef
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
    getInventoryDentist,
    createInventoryDentist,
    updateInventoryDentist,
    deleteInventoryDentist
}