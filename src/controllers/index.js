// const {
//     authUser
// } = require('./auth.controller');

const {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
} = require('./module.user/user.controller');
const {
    getTypeUsers,
    createTypeUser,
    updateTypeUser,
    deleteTypeUser,
} = require('./module.user/typeUser.controller');

const {
    getPermissions,
    createPermission,
    updatePermission,
    deletePermission,
} = require('./module.user/permission.controller');

//specialities.controller
const {
    getSpecialities,
    createSpeciality,
    updateSpeciality,
    deleteSpeciality,
} = require('./module.dentist/specialities.controller');

//Inventory.controller
const {
    getInventory,
    createInventory,
    updateInventory,
    deleteInventory,
} = require('./module.inventory/inventoryDentist.controller');

//typeProduct.controller

const {
    getTypeProducts,
    createTypeProducts,
    updateTypeProduct,
    deleteTypeProduct,
} = require('./module.inventory/typeProduct.controller');

//productExpense.controller

const {
    getProductExpense,
    createProductExpense,
    updateProductExpense,
    deleteProductExpense,
} = require('./module.inventory/productExpense.controller');

//cleaningInventory.controller

const {
    getCleaningInventory,
    createCleaningInventory,
    updateCleaningInventory,
    deleteCleaningInventory,

} = require('./module.inventory/cleaningInventory.controller');


//inventoryDentist.controller

const{
    getInventoryDentist,
    createInventoryDentist,
    updateInventoryDentist,
    deleteInventoryDentist,
}=require('./module.inventory/inventoryDentist.controller');
module.exports = {
    // authUser,

    
	//module users
    getUsers,
    createUser,
    updateUser,
    deleteUser,

    getTypeUsers,
    createTypeUser,
    updateTypeUser,
    deleteTypeUser,

    getPermissions,
    createPermission,
    updatePermission,
    deletePermission,

    getSpecialities,
    createSpeciality,
    updateSpeciality,
    deleteSpeciality,

    
    getInventory,
    createInventory,
    updateInventory,
    deleteInventory,

    getTypeProducts,
    createTypeProducts,
    updateTypeProduct,
    deleteTypeProduct,

    getProductExpense,
    createProductExpense,
    updateProductExpense,
    deleteProductExpense,

    getCleaningInventory,
    createCleaningInventory,
    updateCleaningInventory,
    deleteCleaningInventory,
 
    getInventoryDentist,
    createInventoryDentist,
    updateInventoryDentist,
    deleteInventoryDentist,   

}