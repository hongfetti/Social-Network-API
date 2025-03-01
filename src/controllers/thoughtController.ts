import Thought from '../models/Thought.js'
// import Reaction from '../models/Reaction.js'
import { Request, Response } from 'express'

// get all thoughts
export const getAllThoughts = async(_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
}

// get a single thought by ID
export const getThoughtById = async(req: Request, res: Response) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId }).select("-__v");

        if (!thought) {
            res.status(404).json({ message: "No thought with that ID" });
        } else {
            res.json(thought)
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// create a new thought
export const createThought = async(req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body)
        res.json(thought)
    } catch (err) {
        res.status(500).json(err);
    }
}

// update and existing thought
export const updateThought = async(req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body }
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this ID' });
        }

        res.json(thought);
        return;
    } catch (err) {
        res.status(500).json(err);
        return
    }
}

// delete thought
export const deleteThought = async(req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thought) {
            res.status(404).json({ message: "No user with that ID" });
        } else {
          res.json({ message: "User successfully deleted!" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// add reaction
export const addReaction = async(req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { responses: req.body } }
        );
    
        if (!thought) {
          return res.status(404).json({ message: "No thought with this ID!" });
        }
    
        res.json(thought);
        return;
      } catch (err) {
        res.status(500).json(err);
        return;
      }
}

// // delete reaction
// export const deleteReaction = async(req: Request, res: Response) => {
//     try {
        
//     } catch (err) {
//         res.status(500).json(err);
//     }
// }