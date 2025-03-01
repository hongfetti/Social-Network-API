import User from "../models/User.js";
import { Request, Response } from "express";

// get all users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// create new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get a user by id
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.userId }).select("-__v");

    if (!user) {
      res.status(404).json({ message: "No user with that ID" });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body }
    );

    if (!user) {
      return res.status(404).json({ message: "No user found with this ID" });
    }

    res.json(user);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });

    if (!user) {
      res.status(404).json({ message: "No user with that ID" });
    } else {
      res.json({ message: "User successfully deleted!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// add friend
export const addFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { responses: req.body } }
    );

    if (!user) {
      return res.status(404).json({ message: "No user with this ID!" });
    }

    res.json(user);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// delete friend
export const deleteFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete(
          { _id: req.params.userId },
          { $pull: { responses: { responseId: req.params.responseId } } }
        );
    
        if (!user) {
          return res.status(404).json({ message: "No user with this ID!" });
        }
    
        res.json(user);
        return;
      } catch (err) {
        res.status(500).json(err);
        return;
      }
};
