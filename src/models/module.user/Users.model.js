const { Schema, model } = require('mongoose');

const UserSchema = Schema({
	FirstName: {
		type: String,
		required: [true, 'Los nombres son obligatorios']
	},
	LastName: {
		type: String,
		required: [true, 'Los apellidos son obligatorios']
	},
	Email: {
		type: String,
		required: [true, 'El correo es obligatorio'],
		unique: true
	},
	Age: {
		type: Number,
		required: [true, 'La edad es obligatoria'],
	},
	Password: {
		type: String,
		required: [true, 'La contraseña es obligatoria'],
	},
	PhoneNumber: {
		type: String,
		default: 'No tiene número de celular',
	},
	CI: {
		type: String,
		required: [true, 'El carnet de indetidad es obligatorio'],
		unique: true,
	},
	Rol: {
		type: Schema.Types.ObjectId,
		ref: 'Rol',
		required: [true, 'El rol es obligatorio']
	},
	Perfil :{
		type : String,
		data : Buffer,
		default : 'No tiene foto de perfil',
	},
	State: {
		type: String,
		default : 'Normal',
	},
});

UserSchema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = model('Users', UserSchema);

