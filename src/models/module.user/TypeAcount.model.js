const {Schema,model} = require('mongoose');

const TypeAcountSchema = new Schema({
    name:{
        type: String,
        required: [true, 'El tipo de cuenta es obligatorio']
    }
},  
{timestamps: true});

TypeAcountSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
    
module.exports=model('TypeAcount', TypeAcountSchema);
