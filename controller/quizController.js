const User = require("../models/user.js");
const { addedQuestion, showAllQuestion, matchAnswer, matchAnswerCount } = require("../services/quizService.js");

module.exports = {
    getQuestions: async(req,res) => {
        try{

            const movie = await showAllQuestion()
            return res.status(200).json({
                status: "Success",
                message: "Here is a list of all the questions",
                data: movie,
              });
        } catch(err){
                res.json({
                  status: "error",
                  message: err.message,
                });
              }
            },
    
    addQuestion: async(req, res) => {
        try{
            const question = {
                question_text: req.body.question_text,
                option_a: req.body.option_a,
                option_b: req.body.option_b,
                option_c: req.body.option_c,
                option_d: req.body.option_d,
                correct_option: req.body.correct_option
            }
            const newQuestion = await addedQuestion(question)

            return res.json({
                status: "success",
                message: "Question Added!"
            })
        } catch (err){
            res.json({
                status: "error",
                message: err.message,
              });
            }
          },
    calculateScore: async(req, res) => {
        try{
            if (req.body.optionsTicked.length === 0) {
                return res.json({
                    message: 'Please complete the quizzz !!!'
                })
            }

            const checkAnswers = await matchAnswer()
            const count = await matchAnswerCount(req.body.optionsTicked)
            return res.json({ 
                status: "Successfully submitted",
                message: checkAnswers, 
                score: `${count}/${checkAnswers.length}` })
        } catch(err){
            res.json({
                status: "error",
                message: err.message,
              });
        }
    }      
}