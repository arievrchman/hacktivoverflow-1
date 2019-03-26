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

  async findAllAnswer(req, res) {
    try {
      console.log(req.body);
      let answerOfQuestions = await Question
        .findById(req.body.questionId)
        .populate('answer')

      console.log(answerOfQuestions);
      
    } catch (error) {
    }
  }
};
