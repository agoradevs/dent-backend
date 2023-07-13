const { response } = require('express');
const { BillsSchema, TreatmentsSchema } = require('../../models');

const getBills = async (req, res = response) => {

	try{
		const bills = await BillsSchema.find({state : true})
			.select('paid')
			.select('paymentMethod')
            .populate('assistant', 'name lastName')
			.populate({
				path : 'discounts',
				populate : {
					path : 'typeDiscounts',
					select : 'name discountRate'
				}
			})
		;

		res.json({
			ok: true,
			bills
		});
	} catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const createBill = async (req, res = response) => {

    const bill = new BillsSchema(req.body);
    try {

        const billSave = await bill.save();
        const billWithRef = await BillsSchema.findById(billSave.id)
            .populate('assistant', 'name lastName')
			.populate({
				path : 'discounts',
				populate : {
					path : 'typeDiscounts',
					select : 'name discountRate'
				}
			})
        ;

        const newTreatment = { cancelled : bill.paid };

        await TreatmentsSchema.findByIdAndUpdate(
			bill.treatment, newTreatment, { new: true }
		);

        res.json({
            ok: true,
            bill: billWithRef
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const updateBill = async (req, res = response) => {

    const billId = req.query.id;

    try {

        const newBill = {
            ...req.body
        }

        const billUpdate = await BillsSchema.findByIdAndUpdate(
			billId, newBill, { new: true }
		);

        const billWithRef = await BillsSchema.findById(billUpdate.id);

        res.json({
            ok : true,
            bill : billWithRef
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const deleteBill = async (req, res = response) => {

    const billId = req.query.id;

    try {
        const bill = await BillsSchema.findById(billId);

        let newBill = { ...bill }
        newBill._doc.state = false;

        const billDelete = await BillsSchema.findByIdAndUpdate(billId, newBill, { new: true },);
        const billWithRef = await BillsSchema.findById(billDelete.id);

        res.json({
            ok: true,
            bill: billWithRef
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
	getBills,
	createBill,
	updateBill,
	deleteBill
}