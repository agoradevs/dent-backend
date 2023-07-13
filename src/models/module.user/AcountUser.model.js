const {Schema, model} = require('mongoose');

const AcountUserSchema = new Schema({
    rol: {
        type: Schema.Types.ObjectId,
        ref: 'Roles',
        required: [true, 'El rol es obligatorio']
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'El usuario es obligatorio']
    }],
    typeAccount: {
        type: Schema.Types.ObjectId,
        ref: 'TypeAcounts',
        required: [true, 'El tipo de cuenta es obligatorio']
    },
    userName:{
        type: String,
        required: [true, 'El nombre de usuario es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    state:{
        type: Boolean,
        default: true
    }
},
{timestamps: true});

AcountUserSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});


module.exports = model('AccountUsers', AcountUserSchema);