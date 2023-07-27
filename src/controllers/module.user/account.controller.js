const { response } = require('express');
const bcrypt = require('bcryptjs');
const { AcountUserSchema } = require('../../models');

const getAccounts = async (req, res = response) => {

    const accounts = await AcountUserSchema.find({state : true})
        .select('userName')
        .select('password')
        .populate('typeAccount', 'name')
        .populate('users', 'name lastName email CI age')
        .populate({
            path : 'rol',
            select : ' name',
            populate : {
                path : 'permissions',
                select : 'name'
            }
        })
    ;

    res.json({
        ok: true,
        accounts
    });
}

const createAccount = async (req, res = response) => {

    const account = new AcountUserSchema(req.body);
    try {

        const salt = bcrypt.genSaltSync();
        account.password = bcrypt.hashSync(account.password, salt);

        const accountSave = await account.save();
        const accountWithRef = await AcountUserSchema.findById(accountSave.id)
            .select('userName')
            .select('password')
            .populate('typeAccount', 'name')
            .populate('users', 'name lastName email CI age')
            .populate({
                path : 'rol',
                select : ' name',
                populate : {
                    path : 'permissions',
                    select : 'name'
                }
            })
        ;

        res.json({
            ok: true,
            account: accountWithRef
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const updateAccount = async (req, res = response) => {

    const accountId = req.query.id;

    try {

        const newAccount = {
            ...req.body
        }

        if('password' in newAccount && newAccount.password !== undefined){
            const salt = bcrypt.genSaltSync();
            newAccount.password = bcrypt.hashSync(newAccount.password, salt);
        }

        const accountUpdate = await AcountUserSchema.findByIdAndUpdate(accountId, newAccount, { new: true });

        const accountWithRef = await AcountUserSchema.findById(accountUpdate.id)
            .select('userName')
            .select('password')
            .populate('typeAccount', 'name')
            .populate('users', 'name lastName email CI age')
            .populate('rol', 'name')
		;

        res.json({
            ok : true,
            account : accountWithRef
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const deleteAccount = async (req, res = response) => {

    const accountId = req.query.id;

    try {
        const account = await AcountUserSchema.findById(accountId);

        let newAccount = { ...account }
        newAccount._doc.state = false;

        const accountDelete = await AcountUserSchema.findByIdAndUpdate(accountId, newAccount, { new: true },);
        const accountWithRef = await AcountUserSchema.findById(accountDelete.id)
            .select('userName')
            .populate('users' , 'name lastName email CI age')
            .populate('rol', 'name')
        ;

        res.json({
            ok: true,
            user: accountWithRef
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
    getAccounts,
    createAccount,
    updateAccount,
    deleteAccount
}