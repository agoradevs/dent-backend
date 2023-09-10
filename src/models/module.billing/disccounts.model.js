const { Schema, model } = require('mongoose');

const DisccountsSchema = Schema({
	TypesAccount: [{
		type: Schema.Types.ObjectId,
    ref : 'TypesAccount',
		required: [true, 'El secretario es obligatorio']
	}],
  Name :{
    type : String,
    required : [true, 'El nombre es obligatorio'],
  },
  DisccountRate : {
    type : Number,
    required : [true, 'El porcentaje de descuento es obligatorio'],
  },
	State: {
		type: Boolean,
		default : true,
	},
});

DisccountsSchema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = model('Disccounts', DisccountsSchema);

