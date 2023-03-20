const mongoose = require('mongoose');



const todoSchema = mongoose.Schema({
    title: { 
        type: String,
        required: [true, 'You have to fill in something here'] 
    },
    completed: { 
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Todo', todoSchema)