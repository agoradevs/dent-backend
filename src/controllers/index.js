
const {
    getUsers, createUser, updateUser, deleteUser,
} = require('./module.user/user.controller');
const {
    getTypeUsers, createTypeUser, updateTypeUser, deleteTypeUser,
} = require('./module.user/typeUser.controller');
const {
    getPermissions, createPermission, updatePermission, deletePermission,
} = require('./module.user/permission.controller');
const {
    getTypesAcounts, createTypeAcount, updateTypeAcount, deleteTypeAcount,
} = require('./module.user/typeAcount.controller');
const {
    getRoles, createRol, updateRol, deleteRol,
} = require('./module.user/roles.controller');
const {
    getAccounts, createAccount, updateAccount, deleteAccount
} = require('./module.user/account.controller');


const {
    loginUsuario, revalidarToken
} = require('./auth.controller');


const {
    getTreatments, createTreatment, updateTreatment, deleteTreatment
} = require('./module.history/treatments.controlles');
const {
    getTypeTreatments, createTypeTreatment, updateTypeTreatment, deleteTypeTreatment
} = require('./module.history/typeTreatment.controller');
const {
    getAppoitments, createAppoitment, updateAppoitment, deleteAppoitment
} = require('./module.history/appoitment.controller');


const {
    getTypeDiscounts, createTypeDiscount, updateTypeDiscount, deleteTypeDiscount
} = require('./module.billing/typeDiscount.controller');
const {
    getDiscounts, createDiscount, updateDiscount, deleteDiscount
} = require('./module.billing/discount.controller');

module.exports = {
    // authUser,

    loginUsuario, revalidarToken,
    
	//module users
    getUsers, createUser, updateUser, deleteUser,
    getTypeUsers, createTypeUser, updateTypeUser, deleteTypeUser,
    getPermissions, createPermission, updatePermission, deletePermission,
    getTypesAcounts, createTypeAcount, updateTypeAcount, deleteTypeAcount,
    getRoles, createRol, updateRol, deleteRol,
    getAccounts, createAccount, updateAccount, deleteAccount,

    // module history
    getTypeTreatments, createTypeTreatment, updateTypeTreatment, deleteTypeTreatment,
    getTreatments, createTreatment, updateTreatment, deleteTreatment,
    getAppoitments, createAppoitment, updateAppoitment, deleteAppoitment,

    // module billing
    getTypeDiscounts, createTypeDiscount, updateTypeDiscount, deleteTypeDiscount,
    getDiscounts, createDiscount, updateDiscount, deleteDiscount
}