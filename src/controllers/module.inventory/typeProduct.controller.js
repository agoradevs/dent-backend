const { response } = require('express');
const { TypeProductsSchema } = require('./../../models');

const getTypeProducts = async (req, res = response) => {

    try {
        const typeProducts = await TypeProductsSchema.find({state : true})

        res.json({
            ok: true,
            typeProducts
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const createTypeProducts = async (req, res = response) => {

    const typeProduct = new TypeProductsSchema(req.body);
    try {
        const typeProductSave = await typeProduct.save();

        res.json({
            ok: true,
            typeProduct: typeProductSave,
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const updateTypeProduct = async (req, res = response) => {

    const typeProductId = req.query.id;

    try {

        const newTypeProduct = {
            ...req.body
        }

        const typeProductUpdate = await TypeProductsSchema.findByIdAndUpdate(
            typeProductId, newTypeProduct, { new: true },);

        res.json({
            ok: true,
            typeProduct: typeProductUpdate
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
const deleteTypeProduct = async (req, res = response) => {

    const typeProductId = req.query.id;
    try {
        const typeProduct = await TypeProductsSchema.findById(typeProductId)

        let newTypeProduct = { ...typeProduct }
        newTypeProduct._doc.state = false;

        const typeProductDelete = await TypeProductsSchema.findByIdAndUpdate(typeProductId, newTypeProduct, { new: true });

        res.json({
            ok: true,
            typeProductDelete
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
    getTypeProducts,   
    createTypeProducts,
    updateTypeProduct,
    deleteTypeProduct
}