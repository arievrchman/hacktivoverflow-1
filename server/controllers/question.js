const Question = require('../models/question');
const generateTag = require('../helpers/createTag');

module.exports = {
  async create(req, res) {
    try {
      let tags = req.body.tags;
      let arrTag = await generateTag(tags);
      let newQuestion = {
        owner: req.auth_user.id,
        title: req.body.title,
        description: req.body.description,
        tags: arrTag
      };
      let question = await Question.create(newQuestion);
      res.status(201).json({ question, message: 'Your question has been added' });
    } catch ({ errors }) {
      let errorMessage = {};
      for (const key in errors) {
        errorMessage[key] = errors[key].message;
      }
      res.status(400).json(errorMessage);
    };
  },
  async findAll(req, res) {
    try {
      let questions = await Question.find({}).populate('tags')
      res.json(questions);
    } catch (error) {
      res.status(500).json(error);
    };
  },
  async findOne(req, res) {
    try {
      let question = await Question.findById(req.params.id).populate('tags')
        .populate('answer');;
      res.json(question);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async update(req, res) {
    try {
      let tags = req.body.tags;
      let arrTag = await generateTag(tags);
      let updateQuestion = {
        title: req.body.title,
        description: req.body.description,
        tags: arrTag,
        updated_at: new Date
      }
      let updated = await Question.findByIdAndUpdate(req.params.id, updateQuestion, { new: true })
      res.json({ updated, message: 'Your question has been updated' });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async deleteQuestion(req, res) {
    try {
      await Question.findByIdAndDelete(req.params.id);
      res.json({ message: 'Your question has been deleted' });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async upVotes(req, res) {
    try {
      let question = await Question.findById(req.params.id);
      let result;
      let isDone = question.upvotes.filter(elm => {
        return req.auth_user.id === String(elm);
      });
      if (isDone.length) {
        result = await Question.findByIdAndUpdate(req.params.id, {
          $pull: { upvotes: req.auth_user.id }
        }, { new: true });
        res.json(result);
      } else {
        result = await Question.findByIdAndUpdate(req.params.id, {
          $push: { upvotes: req.auth_user.id },
          $pull: { downvotes: req.auth_user.id }
        }, { new: true });
        res.json(result);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async downVotes(req, res) {
    try {
      let question = await Question.findById(req.params.id);
      let result;
      let isDone = question.downvotes.filter(elm => {
        return req.auth_user.id === String(elm);
      });
      if (isDone.length) {
        result = await Question.findByIdAndUpdate(req.params.id, {
          $pull: { downvotes: req.auth_user.id }
        }, { new: true });
        res.json(result);
      } else {
        result = await Question.findByIdAndUpdate(req.params.id, {
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
