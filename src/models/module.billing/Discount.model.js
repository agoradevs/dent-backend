const {Schema, model} = require('mongoose');

const DiscountSchema = new Schema({
    accountUser:{
        type : Schema.Types.ObjectId,
        ref :'AccountUsers',
        required : [true,'La cuenta del usuario es obligatoria']
    },
    typeDiscounts:[{
        type : Schema.Types.ObjectId,
        ref : 'TypeDiscounts',
        required : [true,'El tipo de descuento es obligatorio'],
    }],
    state : {
        type : Boolean,
        default : true
    }
    
},
{timestamps:true});

DiscountSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Discounts',DiscountSchema);
