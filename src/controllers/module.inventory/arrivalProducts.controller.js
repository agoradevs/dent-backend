const { response } = require('express');
const { ArrivalProductSchema, ProductExpenseSchema } = require('../../models');

const getArrivalProducts = async (req, res = response) => {
    try{
        const CleaningInventory = await ArrivalProductSchema.find({state : true})
            .select('units')
            .select('description')
            .select('date')
            .select('cost')
            .populate('productExpense', 'name units cost total description')
        ;
            
        res.json({
            ok: true,
            CleaningInventory
        });
    }catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const createArrivalProduct = async (req, res = response) => {

    const arrivalProduct = new ArrivalProductSchema(req.body);
    try {

        const product_expense = await ProductExpenseSchema.findById(arrivalProduct.productExpense)
            .select('cost')
            .select('units')
        ;

        arrivalProduct.cost = product_expense.cost;
        arrivalProduct.total = product_expense.cost * arrivalProduct.units;
        arrivalProduct.date = new Date();

        await ProductExpenseSchema.findByIdAndUpdate(
            product_expense.id, 
            {units : product_expense.units + arrivalProduct.units},
            {new : true}
        );

        const arrivalProductSave = await arrivalProduct.save();
        const arrivalProductWithRef = await ArrivalProductSchema.findById(arrivalProductSave.id)
            .select('units')
            .select('description')
            .select('date')
            .select('cost')
            .populate('productExpense', 'name units cost total description')

        res.json({
            ok: true,
            arrivalProduct: arrivalProductWithRef
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const updateArrivalProduct = async (req, res = response) => {

    const arrivalProductId = req.query.id;

    try {

        const newArrivalProduct = {
            ...req.body
        }

        const arrivalProductUpdate = await ArrivalProductSchema.findByIdAndUpdate(
            arrivalProductId, newArrivalProduct, { new: true }
        );

        const arrivalProductWithRef = await ArrivalProductSchema.findById(arrivalProductUpdate.id)
            .select('units')
            .select('description')
            .select('date')
            .select('cost')
            .populate('productExpense', 'name units cost total description')
		;

        res.json({
            ok: true,
            arrivalProduct: arrivalProductWithRef
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const deleteArrivalProduct = async (req, res = response) => {

    const arrivalProductId = req.query.id;

    try {
        const arrivalProduct = await ArrivalProductSchema.findById(arrivalProductId)
        
        const newArrivalProduct = { ...arrivalProduct }
        newArrivalProduct._doc.state = false;

        const arrivalProductDelete = await ArrivalProductSchema.findByIdAndUpdate(
            arrivalProductId, newArrivalProduct, { new: true })
        ;
        const arrivalProductWithRef = await ArrivalProductSchema.findById(arrivalProductDelete.id)
            .populate('productExpense', 'name')

        res.json({
            ok: true,
            Inventario: arrivalProductWithRef
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
    getArrivalProducts,
    createArrivalProduct,
    updateArrivalProduct,
    deleteArrivalProduct
}