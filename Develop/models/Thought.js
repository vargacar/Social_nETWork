const { Schema, model } = require('mongoose');
const reaction = require('./Reaction');

// Schema to create thought model
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reaction: [reaction],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
