const { Schema, model } = require('mongoose');

const AppoitmentsSchema = Schema({
	Treatments: [{
		type: Schema.Types.ObjectId,
    ref : 'Treatments',
		required: [true, 'El tratamiento a pagar es obligatorio']
	}],
  AppoitmentDate : {
    type : Date,
    required : true,
  },
  StartAppoitment : {
    type : Date,
    required : true,
  },
  EndAppoitment : {
    type : Date,
    required : true,
  },
  Observations : {
    type : String,
    required : false,
  },
	State: {
		type: String,
		default : 'Pagado',
	},
});

AppoitmentsSchema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = model('Appoitments', AppoitmentsSchema);

