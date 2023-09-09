const { Schema, model } = require('mongoose');

const ScheduleSchema = Schema({
  Day: {
    type: String,
    required: [true, 'El dia es obligatorio']
  },
  StartTime: {
    type: String,
    required: [true, 'la hora de inicio es obligatorio']
  },
  EndTime: {
    type: String,
    required: [true, 'la hora final es obligatorio']
  },
  Dentist: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
		required: [true, 'El dentista asignado es obligatorio']
  },
  State: {
    type: Boolean,
    default : true,
  },
});

ScheduleSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('Schedule', ScheduleSchema);

