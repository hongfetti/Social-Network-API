import { Schema, ObjectId, model, type Document } from 'mongoose';
import Reaction from './Reaction.js';

interface IThought extends Document {
    thoughtText: String;
    createdAt: Date;
    userId: ObjectId;
    // double check on the below "typeof" - works for now (aka no red)
    reactions: ObjectId[];
}

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // need getter method to set timestamp
          },
        userId: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        ],
        reactions: [Reaction],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    },
)

// Make a virtual called reactionCount that retrives the length of the reactions array
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

export default Thought;
