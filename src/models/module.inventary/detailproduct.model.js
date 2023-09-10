const { Schema, model } = require('mongoose');

const DetailProductSchema = Schema({
  TypeProduct : {
		type: Schema.Types.ObjectId,
    ref : 'TypeProduct',
    required : true,
  },
  Name : {
		type: String,
    required : [true, 'El nombre es obligatorio']
  },
  Stock : {
    type : Number,
    required : true,
  },
  Cost : {
    type : Number,
    required : true,
  },
	State: {
		type: Boolean,
		default : true,
	},
});

DetailProductSchema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = model('DetailProduct', DetailProductSchema);

