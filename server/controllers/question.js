const Question = require('../models/question');
const Tag = require('../models/tag');

module.exports = {
  async create(req, res) {
    try {
      let tags = req.body.tags;
      let arrTags = [];
      for (let i = 0; i < tags.length; i++) {
        let tag = tags[i];
        let findTag = await Tag.findOne({ name: tag });
        if (!findTag) {
          let createTag = await Tag.create({ name: tag });
          arrTags.push(createTag._id);
        } else {
          arrTags.push(findTag._id);
        }
      }
      let newQuestion = {
        owner: req.auth_user.id,
        title: req.body.title,
        description: req.body.description,
        tags: arrTags
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
  }
};
