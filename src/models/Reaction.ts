import { Schema, ObjectId, Types, type Document } from 'mongoose';
import { format } from 'date-fns';

interface IReaction extends Document {
    reactionId: ObjectId;
    reactionBody: string;
    username: string;
    createdAt: String;
}

const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
          },
          username: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
            get: (value: Date): string => format(value, 'MMMM dd, yyyy h:mm a'),
          },
        },
        {
          toJSON: {
            getters: true,
          },
          id: false,
        }
      );

export default reactionSchema;
