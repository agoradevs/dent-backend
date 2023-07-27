const { response } = require('express');
const { DiscountSchema } = require('../../models');

const getDiscounts = async (req, res = response) => {

	try{
		const discounts = await DiscountSchema.find({state : true})
            .populate('accountUser', 'userName')
			.populate('typeDiscounts', 'name')
		;

		res.json({
			ok: true,
			discounts
		});
	} catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const createDiscount = async (req, res = response) => {

    const discount = new DiscountSchema(req.body);
    try {

        const discountSave = await discount.save();
        const discountWithRef = await DiscountSchema.findById(discountSave.id)
            .populate('accountUser', 'userName')
			.populate('typeDiscounts', 'name')
        ;

        res.json({
            ok: true,
            discount: discountWithRef
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const updateDiscount = async (req, res = response) => {

    const discountId = req.query.id;

    try {

        const newDiscount = {
            ...req.body
        }

        const discountUpdate = await DiscountSchema.findByIdAndUpdate(
			discountId, newDiscount, { new: true }
		);

        const discountWithRef = await DiscountSchema.findById(discountUpdate.id)
            .populate('accountUser', 'userName')
			.populate('typeDiscounts', 'name')
			.select('state')
		;

        res.json({
            ok : true,
            discount : discountWithRef
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const deleteDiscount = async (req, res = response) => {

    const discountId = req.query.id;

    try {
        const discount = await DiscountSchema.findById(discountId);

        let newAccount = { ...discount }
        newAccount._doc.state = false;

        const discountDelete = await DiscountSchema.findByIdAndUpdate(discountId, newAccount, { new: true },);
        const discountWithRef = await DiscountSchema.findById(discountDelete.id);

        res.json({
            ok: true,
            user: discountWithRef
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
	getDiscounts,
	createDiscount,
	updateDiscount,
	deleteDiscount
}