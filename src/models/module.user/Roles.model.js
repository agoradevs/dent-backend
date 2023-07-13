const { Schema, model } = require('mongoose');

const RolesSchema = new Schema({
    name:{
        type: String,
        required: [true, 'El rol es obligatorio']
    },
    permissions: [{
        type: Schema.Types.ObjectId,
        ref: 'Permissions',
        require: [true, 'Los permisos son obligatorios']
    }],
    state:{
        type: Boolean, 
        default: true
    }
},
{timestamps: true});


RolesSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Roles', RolesSchema);

