const {Schema, model} = require('mongoose');

const TreatmentsSchema = new Schema({
    patient:{
        type : Schema.Types.ObjectId,
        ref : 'Users',
        required : [true, 'El nombre del paciente es obligatorio']
    },
    dentist:{
        type : Schema.Types.ObjectId,
        ref : 'Users',
        required : [true, 'El nombre del dentista es obligatorio']
    },
    typeTreatment:{
        type : Schema.Types.ObjectId,
        ref : 'TypeTreatments',
        required : [true, 'El tipo de tratamiento es obligatorio']
    },
    teeths:[{
        type : String,
        required : [true, 'Los dientes tienen que ser especificados']
    }],
    completedDays:{
        type : Number,
        default : 0
    },
    cost:{
        type : Number,
        default : 0
    },
    stateTreatment : {
        type : String,
        default : "initiated"
    },
    cancelled : {
        type : Number,
        default : 0
    },
    state:{
        type : Boolean,
        default : true
    }

},{timestamps:true});

TreatmentsSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
module.exports = model('Treatments',TreatmentsSchema);