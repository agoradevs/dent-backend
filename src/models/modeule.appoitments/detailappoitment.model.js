const { Schema, model } = require('mongoose');

const DetailAppoitmentSchema = Schema({
	Appoitment: {
		type: Schema.Types.ObjectId,
    ref : 'Appoitments',
		required: [true, 'La cita es obligatoria']
	},
  Product : {
		type: Schema.Types.ObjectId,
    ref : 'Product',
		required: [true, 'El producto usado debe ser obligatorio'],
  },
  Units : {
		type: Number,
    default : 0,
  },
  Details : {
    type : String,
    default : 'No hay detalles del producto gastado',
  },
	State: {
		type: String,
		default : 'Pagado',
	},
});

DetailAppoitmentSchema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = model('DetailAppoitment', DetailAppoitmentSchema);

