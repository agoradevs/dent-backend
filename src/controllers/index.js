
const {
    getUsers, createUser, updateUser, deleteUser,
} = require('./module.user/user.controller');
const {
    getPermissions, createPermission, updatePermission, deletePermission, dropPermission
} = require('./module.user/permission.controller');
const {
    getTypesAcounts, createTypeAcount, updateTypeAcount, deleteTypeAcount,
} = require('./module.user/typeAcount.controller');
const {
    getRoles, createRol, updateRol, deleteRol, dropRol
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
const {
    getBills, createBill, updateBill, deleteBill
} = require('./module.billing/bill.controller');


const {
    getSpecialities, createSpeciality, updateSpeciality, deleteSpeciality
} = require('./module.dentist/specialities.controller');


const {
    getTypeProducts, createTypeProducts, updateTypeProduct, deleteTypeProduct
} = require('./module.inventory/typeProduct.controller');
const {
    getProductExpense, createProductExpense, updateProductExpense, deleteProductExpense
} = require('./module.inventory/productExpense.controller');
const {
    getCleaningInventory, createCleaningInventory, updateCleaningInventory, deleteCleaningInventory
} = require('./module.inventory/cleaningInventory.controller');
const{
    getInventoryDentist, createInventoryDentist, updateInventoryDentist, deleteInventoryDentist
}=require('./module.inventory/inventoryDentist.controller');

module.exports = {
    // authUser,

    loginUsuario, revalidarToken,
    
	//module users
    getUsers, createUser, updateUser, deleteUser,
    getPermissions, createPermission, updatePermission, deletePermission, dropPermission,
    getTypesAcounts, createTypeAcount, updateTypeAcount, deleteTypeAcount,
    getRoles, createRol, updateRol, deleteRol, dropRol,
    getAccounts, createAccount, updateAccount, deleteAccount,

    // module history
    getTypeTreatments, createTypeTreatment, updateTypeTreatment, deleteTypeTreatment,
    getTreatments, createTreatment, updateTreatment, deleteTreatment,
    getAppoitments, createAppoitment, updateAppoitment, deleteAppoitment,

    // module billing
    getTypeDiscounts, createTypeDiscount, updateTypeDiscount, deleteTypeDiscount,
    getDiscounts, createDiscount, updateDiscount, deleteDiscount,
    getBills, createBill, updateBill, deleteBill,


    // module dentist
    getSpecialities, createSpeciality, updateSpeciality, deleteSpeciality,

    // module inventory
    getTypeProducts, createTypeProducts, updateTypeProduct, deleteTypeProduct,
    getProductExpense, createProductExpense, updateProductExpense, deleteProductExpense,
    getCleaningInventory, createCleaningInventory, updateCleaningInventory, deleteCleaningInventory,
    getInventoryDentist, createInventoryDentist, updateInventoryDentist, deleteInventoryDentist 

}