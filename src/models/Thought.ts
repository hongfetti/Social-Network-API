import { Schema, ObjectId, model, type Document } from 'mongoose';
import { format } from 'date-fns';
import Reaction from './Reaction.js';

interface IThought extends Document {
    thoughtText: String;
    createdAt: String;
    userId: ObjectId;
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
            get: (value: Date): string => format(value, 'MMMM dd, yyyy h:mm a'),
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
            getters: true,
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
