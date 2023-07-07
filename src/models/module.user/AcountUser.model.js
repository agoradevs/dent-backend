const {Schema, model} = require('mongoose');

const AcountUserSchema = new Schema({
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'El usuario es obligatorio']
    }],
    typeAcount: {
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


module.exports = model('AccountUser', AcountUserSchema);