const {Schema, model} = require('mongoose');

const PermissionsSchema = Schema({
    name:{
        type: String,
        required: [true, 'El rol es obligatorio']
    },
    category:{
        type: String,
        required: [true, 'La categoria es obligatoria']
    },
    state:{
        type: Boolean,
        default: true
    },
},
    {timestamps: true});

    PermissionsSchema.method('toJSON', function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    
module.exports = model('Permissions', PermissionsSchema);