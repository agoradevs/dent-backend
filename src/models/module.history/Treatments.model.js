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
    theeths:[{
        type : String,
        required : [true, 'Los dientes tienen que ser especificados']
    }],
    daysTreatments:{
        type : Number,
        required : [true, 'la cantidad de dias de tratamiento son obligatorios']
    },
    timeTraetments:{
        type : Number,
        required : [true, 'la cantidad de tiempo de tratamiento es obligatorio']
    },
    cost:{
        type : Number,
        required : [true, 'El costo del tratamiento es obligatorio']
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