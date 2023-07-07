const {Schema, model} = require('mongoose');

const PermissionsSchema = new Schema({
    name :{
        type : String,
        required : [true, 'El permiso es obligatorio']
    },
    state : {
        type : Boolean,
        default : true
    }
},
{timestamps: true});

PermissionsSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
    
module.exports = model('Permissions', PermissionsSchema);