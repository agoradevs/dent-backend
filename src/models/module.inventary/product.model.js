const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
  DetailProduct : {
		type: Schema.Types.ObjectId,
    ref : 'DetailProduct',
    required : true,
  },
  DateAdmission : {
		type: Date,
    required : true,
  },
  DateExpiry : {
    type : Date,
    required : true,
  },
	State: {
		type: Boolean,
		default : true,
	},
});

ProductSchema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = model('Product', ProductSchema);

