const { Schema, model } = require('mongoose');

const PaymentSchema = Schema({
	Secretary: {
		type: Schema.Types.ObjectId,
    ref : 'Users',
		required: [true, 'El secretario es obligatorio']
	},
	Treatment: {
		type: Schema.Types.ObjectId,
    ref : 'Treatments',
		required: [true, 'El tratamiento a pagar es obligatorio']
	},
	Disccounts: [{
		type: Schema.Types.ObjectId,
    ref : 'Disccounts',
		required: [true, 'El descuento para este pago es obligatorio']
	}],
	Total: {
		type: Number,
		required: true,
	},
  Date : {
    type : Date,
    required : true,
  },
	State: {
		type: String,
		default : 'Pagado',
	},
});

PaymentSchema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = model('Payment', PaymentSchema);

