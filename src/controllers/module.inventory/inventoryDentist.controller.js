const {response} = require('express');
const {InventoryDentistSchema} = require('../../models');

const getInventoryDentist = async (req, res = response) => {
    
        try {
            const inventoryDentist = await InventoryDentistSchema.find()
            .select('cost')
            .select('units')
            .populate('appoitment','treatment date stateAppoitment')
            .populate('products','nameProduct cost units')
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
        const inventarioDentistaGuardado = await inventoryDentist.save();
        const inventarioConReferencias = await InventoryDentistSchema.findById(inventarioDentistaGuardado.id)
            .select('cost')
            .select('units')
            .populate('appoitment', 'treatment date stateAppoitment')
            .populate('products', 'nameProduct cost units')

        res.json({
            ok: true,
            Inventario: inventarioConReferencias
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
        const inventarioConReferencias = await InventoryDentistSchema.findById(inventoryUpdate.id)
        .select('cost')
        .select('units')
        .populate('appoitment', 'date')
        .populate('products', 'name')
    ;

        res.json
        ({
            ok: true,
            inventory: inventoryUpdate
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
        
        let newInventoryDentist = { ...inventoryDentist }
        newInventoryDentist._doc.state = false;

        const inventoryDentistDelete = await InventoryDentistSchema.findByIdAndUpdate(InventoryDentistId, newInventoryDentist, { new: true },);
        const InventoryDentWithRef = await InventoryDentistSchema.findById(inventoryDentistDelete.id)
            .populate('appoitment', 'date')
            .populate('products', 'name');

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