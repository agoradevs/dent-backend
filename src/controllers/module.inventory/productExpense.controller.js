const { response } = require('express');
const { ProductExpenseSchema } = require('../../models');

const getProductExpense = async (req, res = response) => {

    const Products = await ProductExpenseSchema.find()
        .select('name')
        .select('units')
        .select('cost')
        .select('description')
        .populate('productType', 'name')
    res.json({
        ok: true,
        Products
    });
}

const createProductExpense = async (req, res = response) => {

    const Product = new ProductExpenseSchema(req.body);
    try {

        const productoGuardado = await Product.save();
        const productoConReferencias = await ProductExpenseSchema.findById(productoGuardado.id)
            .select('name')
            .select('units')
            .select('cost')
            .select('description')
            .populate('productType', 'name')

        res.json({
            ok: true,
            producto: productoConReferencias
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const updateProductExpense = async (req, res = response) => {

    const productId = req.query.id;

    try {

        const newProduct = {
            ...req.body
        }

        const productUpdate = await ProductExpenseSchema.findByIdAndUpdate(
            productId, newProduct, { new: true }
        );

        const productWithRef = await ProductExpenseSchema.findById(productUpdate.id)
            .select('name')
            .select('units')
            .select('cost')
            .select('description')
            .populate('productType', 'name')
		;

        res.json({
            ok: true,
            product: productWithRef
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const deleteProductExpense = async (req, res = response) => {

    const productId = req.query.id;

    try {
        const product = await ProductExpenseSchema.findById(productId)
        
        const newProduct = { ...product }
        newProduct._doc.state = false;

        const productDelete = await ProductExpenseSchema.findByIdAndUpdate(productId, newProduct, { new: true },);
        const productWithRef = await ProductExpenseSchema.findById(productDelete.id)
            .populate('productType', 'name')
        res.json({
            ok: true,
            product: productWithRef
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
    getProductExpense,
    createProductExpense,
    updateProductExpense,
    deleteProductExpense,
}