const {Schema, model} = require('mongoose');

const TypeProductsSchema = new Schema({
    name:{
        type : String,
        required : [true,'El nombre del tipo de producto es obligatorio']
    }

},{timestamps:true});

TypeProductsSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
module.exports = model('TypeProducts',TypeProductsSchema);