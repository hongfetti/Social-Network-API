import { Schema, ObjectId, model, type Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    friends: ObjectId[];
    thoughts: ObjectId[];
}

const userSchema = new Schema<IUser>(
    {
        username: String,
        email: String,
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    },
)

// Make virtual called friendsCount that retreives the length of the user's friends array

const User = model('User', userSchema);

export default User;
