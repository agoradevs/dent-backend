const {Schema, model} = require('mongoose');

const CleaningInventorySchema = Schema({
    productExpense:{
        type:Schema.Types.ObjectId,
        ref:'ProductsExpense',
        required:[true,'El producto es obligatorio'],
    },
    units:{
        type:Number,
        required:[true,'Las unidades son obligatorias'],
    },
    description:{
        type:String,
        required:[true,'La descripcion del producto es obligatoria'],
    },
    date:{
        type:Date,
        required:[true,'La fecha es obligatoria'],
    },

},{timestamps:true});

CleaningInventorySchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('CleaningInventory',CleaningInventorySchema);