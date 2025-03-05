import { Schema, ObjectId, model, type Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    friends: ObjectId[];
    thoughts: ObjectId[];
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
                'Please provide a valid email address',
            ],
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                default: []
            }
        ],
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
                default: []
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
userSchema.virtual('friendsCount').get(function () {
    return this.friends.length;
})

const User = model('User', userSchema);

export default User;
