

const validaCampos = require('./validar-campos');
const validarJWT = require('./validar-jwt');
const {
    PermissionPermissions
} = require('./permissions');

module.exports = {
    ...validaCampos,
    ...validarJWT,
    PermissionPermissions
}