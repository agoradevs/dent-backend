const {Schema, model} = require('mongoose');

const InventoryDentistSchema = new Schema({
    appoitment:{
        type : Schema.Types.ObjectId,
        ref :'Appoitments',
        required:[true,'La cita es obligatoria']
    },
    product : {
        type : Schema.Types.ObjectId,
        ref : 'ProductsExpenses',
        required : [true,'El producto es obligatorio']
    },
    cost:{
        type : Number,
        required : [true,'El costo es obligatorio']
    },
    units:{
        type : Number,
        required : [true,'Las unidades son obligatorias']
    },
    state : {
        type : Boolean,
        default : true
    }

},{timestamps:true});

InventoryDentistSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
module.exports = model('InventoryDentists',InventoryDentistSchema);
