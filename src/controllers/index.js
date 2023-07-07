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
    deletePermission
}