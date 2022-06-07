const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
    thoughtText: { 
        type: String, 
        required: true, 
        minlength:1, 
        maxlength: 280
    },
    createdAt: { 
        type: Date, 
        default: Date.now,
    },
    user: { 
        //i think this should actually be a string per assignment instructions but trying to make it work with the user.js
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;