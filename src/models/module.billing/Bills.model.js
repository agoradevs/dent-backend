const {Schema,model} = require('mongoose');

const BillsSchema = Schema({
    assistant:{
        typeo:Schema.Types.ObjectId,
        ref:'Users',
        required:[true,'El nombre del encargado es obligatorio']
    },
    treatment:[{
        typeo:Schema.Types.ObjectId,
        ref:'Treatments',
        required:[true,'El tratamiento es obligatorio']  
    }],
    discounts:[{
        typeo:Schema.Types.ObjectId,
        ref:'Discounts',
        required:true
    }],
    taxes:{
        type:Number,
        required:true,
    },
    paid:{
        type:Number,
        required:[true,'El pago es obligatorio'],

    },
    total:{
        type:Number,
        required:[true,'El total del pago es obligatorio'],
    },
    subtotal:{
        type:Number,
        required:[true,'El subtotal del pago es obligatorio'],
    },
    paymentMethod:{
        type:String,
        required:[true,'El metodo de pago es obligatorio'],
    },
    state:{
        type:Boolean,
        default:true,
    }
},{
    timestamps:true});

BillsSchema.method('toJSON', function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });   


module.exports = model('Bills',BillsSchema);