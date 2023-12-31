const {Schema,model} = require('mongoose');

const BillsSchema = new Schema({
    assistant:{
        type : Schema.Types.ObjectId,
        ref : 'Users',
        required : [true,'El nombre del encargado es obligatorio']
    },
    treatment:{
        type : Schema.Types.ObjectId,
        ref : 'Treatments',
        required : [true,'El tratamiento es obligatorio']  
    },
    discounts:[{
        type : Schema.Types.ObjectId,
        ref : 'Discounts',
        default : null
    }],
    paid:{
        type : Number,
        required : [true,'El pago es obligatorio']
    },
    paymentMethod:{
        type : String,
        required : [true,'El metodo de pago es obligatorio']
    },
    state:{
        type : Boolean,
        default : true,
    }
},
{timestamps:true});

BillsSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});   

module.exports = model('Bills',BillsSchema);