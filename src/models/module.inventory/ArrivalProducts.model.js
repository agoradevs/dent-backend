const {Schema, model} = require('mongoose');

const ArrivalProductSchema = new Schema({
    productExpense: {
        type: Schema.Types.ObjectId,
        ref: 'ProductsExpenses',
        required: [true, 'El producto del cual es llegando es obligatorio']
    },
	units: {
		type : Number,
		required : [true, 'Las unidades de la llegada del producto son obligatorios']
	},
	cost : {
		type : Number,
		required : [true, 'El costo del producto es obligatorio']
	},
	total : {
		type : Number,
		required : [true, 'El total gastado es obligatorio']
	},
	date : {
		type : Date,
		required : [true, 'La fecha de entrega del producto es necesaria']
	},
	description :{
		type : String,
		required : [true , 'Es necesario la descripcion del producto']
	},
    state:{
        type: Boolean,
        default: true
    }
},
{timestamps: true});

ArrivalProductSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});


module.exports = model('ArrivalProducts', ArrivalProductSchema);