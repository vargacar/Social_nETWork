const { Thought, User } = require('../models');

const thoughtController = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  async getThought(req, res) {
    try {
      const thought = await Thought.findOne({
          _id: req.params.id
        },
      )
      if (!thought) {
        res.status(400).json({ 
            message: 'Thought not found.',
          }
        );
        return;
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body)
      const user = await User.findOneAndUpdate(
        { 
          _id: req.body.userId,
          thoughts: { $ne: newThought._id },
        }, 
        { $push : { thoughts: newThought._id }},
        { 
          new: true,
          unique: true,
        }
      );
      res.json(newThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body,
        { 
          new: true, 
        },
      )
      if (!updatedThought) {
        res.status(404).json({
          message: 'Thought not found.',
        });
        return;
      }
      res.json(updatedThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thoughtToRemove = await Thought.findByIdAndDelete(req.params.id);
      if(!thoughtToRemove) {
        res.status(404).json({
          message: 'Thought not found.',
        })
        return;
      }
      const user = await User.findOneAndUpdate(
        { 
          thoughts: { $eq: req.params.id },
        }, 
        { $pull : { thoughts: req.params.id }},
        { 
        }
      )
      res.json(thoughtToRemove);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    try {
      const thoughtToReactTo = await Thought.findOneAndUpdate({ _id: req.params.id},{$addToSet:{reactions:req.body}},{runValidators:true,new:true});
      if (!thoughtToReactTo) {
        res.status(404).json({
          message: 'Thought not found.',
        })
      }
      // thoughtToReactTo.reactions.push(req.body);
      res.json(thoughtToReactTo);

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const thoughtToRemoveReactionFrom = await Thought.findOneAndUpdate({ _id: req.params.id});
      if (!thoughtToReactTo) {
        res.status(404).json({
          message: 'Thought not found.',
        })
      }
      thoughtToRemoveReactionFrom.reactions.id(req.body.reactionId).remove();
      res.json(thoughtToReactTo);

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }

  },

}

module.exports = thoughtController;