const { response } = require('express');
const bcrypt = require('bcryptjs');
const { ProductExpenseSchema } = require('../../models');

const getProductExpense = async (req, res = response) => {

    const Products = await ProductExpenseSchema.find()
        .select('name')
        .select('units')
        .select('cost')
        .select('description')
        .populate('typeProduct', 'name')
    res.json({
        ok: true,
        Products
    });
}

const createProductExpense = async (req, res = response) => {

    const Product = new ProductExpenseSchema(req.body);
    try {

        // Encriptar contraseña

        const productoGuardado = await Product.save();
        const productoConReferencias = await ProductExpenseSchema.findById(productoGuardado.id)
            .select('nameProduct')
            .select('units')
            .select('cost')
            .select('description')
            .populate('ProductType', 'name')

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

    const productId = req.params.id;

    try {

        const nuevoProducto = {
            ...req.body
        }

        const productoActualizado = await ProductExpenseSchema.findByIdAndUpdate(productId, nuevoProducto, { new: true },);

        const productoConReferencias = await ProductExpenseSchema.findById(productoActualizado.id)
            .select('name')
            .select('units')
            .select('cost')
            .select('description')
            .populate('ProductType', 'name')
		;

        res.json({
            ok: true,
            producto: productoConReferencias
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

    const productId = req.params.id;

    try {
        const product = await ProductExpenseSchema.findById(productId)
        if (product.isSuperUser) {
            return res.status(400).json({
                ok: false,
                msg: 'No es posible eliminar a un super usuario'
            });
        }
        let newProduct = { ...productId }
        newProduct._doc.state = false;

        const productDelete = await ProductExpenseSchema.findByIdAndUpdate(productId, newProduct, { new: true },);
        const productWithRef = await ProductExpenseSchema.findById(productDelete.id)
            .populate('ProductType', 'name')
        res.json({
            ok: true,
            Producto: productWithRef
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