const {Schema, model} = require('mongoose');

const InventoryDentistSchema = Schema({
    appointment:{
        typeo:Schema.Types.ObjectId,
        ref:'Appointments',
        required:[true,'La cita es obligatoria'],
    },
    products:[{
        type:Schema.Types.ObjectId,
        ref:'ProductsExpense',
        required:[true,'El producto es obligatorio'],
    }],
    cost:{
        type:Number,
        required:[true,'El costo es obligatorio'],
    },
    units:{
        type:Number,
        required:[true,'Las unidades son obligatorias'],
    },

},{timestamps:true});

InventoryDentistSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
module.exports = model('InventoryDentist',InventoryDentistSchema);
