const { response } = require('express');
const { TypeDisccountSchema } = require('../../models');

const getTypeDiscounts = async (req, res = response) => {

	try{
		const typeDisccounts = await TypeDisccountSchema.find({state : true})
			.select('name')
			.select('discountRate')
			.populate('typeAccounts', 'name')
		;

		res.json({
			ok: true,
			typeDisccounts
		});
	} catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const createTypeDiscount = async (req, res = response) => {

    const typeDisccount = new TypeDisccountSchema(req.body);
    try {

        const typeDisccountSave = await typeDisccount.save();
        const typeDisccountWithRef = await TypeDisccountSchema.findById(typeDisccountSave.id)
            .select('name')
            .select('discountRate')
            .populate('typeAccounts', 'name')
        ;

        res.json({
            ok: true,
            typeDisccount: typeDisccountWithRef
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const updateTypeDiscount = async (req, res = response) => {

    const typeDisccountId = req.query.id;

    try {

        const newTypeDisccount = {
            ...req.body
        }

        const typeDisccountUpdate = await TypeDisccountSchema.findByIdAndUpdate(
			typeDisccountId, newTypeDisccount, { new: true }
		);

        const typeDisccountWithRef = await TypeDisccountSchema.findById(typeDisccountUpdate.id)
			.select('name')
			.select('discountRate')
			.select('state')
			.populate('typeAccounts', 'name')
		;

        res.json({
            ok : true,
            typeDisccount : typeDisccountWithRef
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const deleteTypeDiscount = async (req, res = response) => {

    const typeDisccountId = req.query.id;

    try {
        const typeDisccount = await TypeDisccountSchema.findById(typeDisccountId);

        let newAccount = { ...typeDisccount }
        newAccount._doc.state = false;

        const typeDisccountDelete = await TypeDisccountSchema.findByIdAndUpdate(typeDisccountId, newAccount, { new: true },);
        const typeDisccountWithRef = await TypeDisccountSchema.findById(typeDisccountDelete.id);

        res.json({
            ok: true,
            user: typeDisccountWithRef
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
	getTypeDiscounts,
	createTypeDiscount,
	updateTypeDiscount,
	deleteTypeDiscount
}