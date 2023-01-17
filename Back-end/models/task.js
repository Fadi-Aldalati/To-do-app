const Joi = require ('joi');
const mongoose= require ('mongoose')

const taskSchema  = new mongoose.Schema({
    title:{
        type: String,
        minlength:0,
        maxlength:5000
    },
    date:{
        type : Date,
        default: Date.now()
    }
});
function validateTask(task) {
    const schema = Joi.object({
      title: Joi.string().max(5000).min(0).required()
    });
    return schema.validate();
  }

const Task = mongoose.model('Task', taskSchema);
exports.Task = Task;
exports.validate = validateTask