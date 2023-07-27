const {Schema, model} = require('mongoose');

const ProductExpenseSchema = new Schema({
    productType:{
        type : Schema.Types.ObjectId,
        ref : 'TypeProducts',
        required : [true,'El tipo de producto es obligatorio']
    },
    name:{
        type : String,
        required : [true,'El nombre del producto es obligatorio'],
        unique : true
    },
    units:{
        type : Number,
        required : [true,'Las unidades son obligatorias']
    },
    cost:{
        type : Number,
        required : [true,'El costo del producto es obligatorio']
    },
    description:{
        type : String,
        required : [true,'La descripcion del producto es obligatoria']
    },
    state:{
        type : Boolean,
        default : true
    }

},{timestamps:true});

ProductExpenseSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('ProductsExpenses',ProductExpenseSchema);
