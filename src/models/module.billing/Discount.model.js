const {Schema, model} = require('mongoose');

const DiscountSchema = Schema({
    acountUser:{
        type:Schema.Types.ObjectId,
        ref:'AccountUser',
        required:[true,'La cuenta del usuario es obligatoria']
    },
    typeDisccount:[{
        type:Schema.Types.ObjectId,
        ref:'TypeDiscounts',
        required:[true,'El tipo de descuento es obligatorio'],
    }]
    
},{timestamps:true});
DiscountSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
module.exports = model('Discounts',DiscountSchema);
