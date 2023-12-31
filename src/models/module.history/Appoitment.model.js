const {Schema,model} = require('mongoose');

const AppoitmentSchema = new Schema({
    assistant:{
        type: Schema.Types.ObjectId,
        ref:'Users',
        required:[true,'El encargado es obligatorio']
    },
    treatment:{
        type: Schema.Types.ObjectId,
        ref: 'Treatments',
        required: [true,'El tratamiento es obligatorio']
    },
    appoitmentDate:{
        type: Date,
        required: [true,'La fecha de la cita es obligatoria']
    },
    duration:{
        type: Number,
        required: [true,'La duracion de la cita es obligatoria']
    },
    observations:{
        type: String,
        default : ""
    },
    stateAppoitment : {
        type : String,
        default : "Pendiente"
    }
    ,
    state:{
        type: Boolean,
        default:true
    }
},
{timestamps:true});

AppoitmentSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Appoitments',AppoitmentSchema);