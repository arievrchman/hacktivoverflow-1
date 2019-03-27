const Answer = require('../models/answer');
const Question = require('../models/question');
module.exports = {
  async create(req, res) {
    try {
      let newAnswer = {
        owner: req.auth_user.id,
        description: req.body.description
      };
      let postAnswer = await Answer.create(newAnswer);

      let findQuestions = await Question
        .findById(req.body.questionId);

      findQuestions.answer.push(postAnswer._id);
      await findQuestions.save();
      res.status(201).json({
        postAnswer,
        message: 'Your answer has been added'
      })
    } catch ({ error }) {
      let errorMessage = {};
      for (const key in errors) {
        errorMessage[key] = errors[key].message;
      }
      res.status(400).json(errorMessage);
    };
  },
  async update(req, res) {
    try {
      let updateQuestion = {
        description: req.body.description,
        updated_at: new Date
      }
      let updated = await Answer.findByIdAndUpdate(req.params.id, updateQuestion, { new: true });
      res.json({ updated, message: 'Your answer has been updated' });
    } catch (error) {
      res.status(500).json(error);
    };
  },
  async deleteAnswer(req, res) {
    try {
      await Question.findOneAndUpdate({ _id: req.body.questionId }, { $pull: { answer: req.params.id } }, { new: true });
      await Answer.findByIdAndDelete(req.params.id);
      res.json({ message: 'Your answer has been deleted' });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async upvotes(req, res) {
    try {
      let answer = await Answer.findById(req.params.id);
      let result;
      let isDone = answer.upvotes.filter(elm => {
        return req.auth_user.id === String(elm);
      });
      if (isDone.length) {
        result = await Answer.findByIdAndUpdate(req.params.id, {
          $pull: { upvotes: req.auth_user.id }
        }, { new: true });
        res.json(result);
      } else {
        result = await Answer.findByIdAndUpdate(req.params.id, {
          $push: { upvotes: req.auth_user.id },
          $pull: { downvotes: req.auth_user.id }
        }, { new: true });
        res.json(result);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async downvotes(req, res) {
    try {
      let answer = await Answer.findById(req.params.id);
      let result;
      let isDone = answer.downvotes.filter(elm => {
        return req.auth_user.id === String(elm);
      });
      if (isDone.length) {
        result = await Answer.findByIdAndUpdate(req.params.id, {
          $pull: { downvotes: req.auth_user.id }
        }, { new: true });
        res.json(result);
      } else {
        result = await Answer.findByIdAndUpdate(req.params.id, {
          $push: { downvotes: req.auth_user.id },
          $pull: { upvotes: req.auth_user.id }
        }, { new: true });
        res.json(result);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
