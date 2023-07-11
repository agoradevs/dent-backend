const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    roles: [{
        type: Schema.Types.ObjectId,
        ref: 'Roles',
        required: [true, 'El rol es obligatorio']
    }],
    typeUser: {
        type: Schema.Types.ObjectId,
        ref: 'TypeUsers',
        required: [true, 'El tipo de usuario es obligatorio']
    },
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    lastName: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        default : null,
        unique: true
    },
    phoneNumber: {
        type: Number,
		default: 'No tiene número de celular'
    },
    CI: {
        type: String,
		required: [true, 'El carnet de indetidad es obligatorio'],
		unique: true
    },
    age: {
        type: Number,
        required: [true, 'La edad es obligatoria']        
    },
    state : {
        type : Boolean,
        default : true
    }
});

UserSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Users', UserSchema);

