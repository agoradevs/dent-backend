
const { response, request } = require('express');

const PermissionPermissions = async (req = request, res = response, next) => {

    const user = req.header('userId');

	console.log(user);
	next();

}

module.exports = {
    PermissionPermissions,
}