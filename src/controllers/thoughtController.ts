import Thought from '../models/Thought.js'
import User from '../models/User.js'
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
export const createThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.create({
        thoughtText: req.body.thoughtText,
        userId: req.body.userId, // Ensure you're passing the correct userId here
      });
  
      // Now link this thought to the user's `thoughts` array
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }
  
      return res.json({ message: 'Thought created and linked to user!', thought, user });
    } catch (err) {
      return res.status(500).json(err);
    }
  };

// update and existing thought
export const updateThought = async(req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
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
export const deleteThought = async (req: Request, res: Response) => {
    try {

      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
  
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
  
      const user = await User.findByIdAndUpdate(
        thought.userId, 
        { $pull: { thoughts: thought._id } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: "No user found with this thought!" });
      }
  
      return res.json({ message: "Thought successfully deleted and removed from user!", thought, user });
    } catch (err) {
      return res.status(500).json(err);
    }
  };

// add reaction
export const addReaction = async(req: Request, res: Response) => {
    try {
        const reaction = {
            reactionBody: req.body.reactionBody,
            username: req.body.username,
            createdAt: Date.now()
        };

        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: reaction } },
          { new: true }
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

// delete reaction
export const deleteReaction = async(req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: "No thoughts with this ID!" });
        }

        res.json(thought)
        return
    } catch (err) {
        res.status(500).json(err);
        return
    }
}