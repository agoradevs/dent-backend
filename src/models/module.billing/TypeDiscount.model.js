const {Schema,model} = require('mongoose');

const TypeDisccountSchema = new Schema({
    typeAcount:{
        type : Schema.Types.ObjectId,
        ref : 'TypeAccount',
        required:[true,'El tipo de cuenta es obligatorio']
    },
    name:{
        type : String,
        required : [true,'El nombre del tipo de descuento es obligatorio']
    },
    discountRate:{
        type : Number,
        required : [true,'El porcentaje de descuento es obligatorio']
    }
},{timestamps:true});

TypeDisccountSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('TypeDiscounts',TypeDisccountSchema);