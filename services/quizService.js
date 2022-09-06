const Quiz = require('../models/quiz');

module.exports.showAllQuestion = async () => {
    return await Quiz.find({}, '-correct_option').lean()
}

module.exports.addedQuestion = async (question) => {
    return await Quiz.create(question)
}

module.exports.matchAnswer = async() => {
    return  await Quiz.find({}, 'correct_option').lean()
}

module.exports.matchAnswerCount = async(listOfAnswerCheck) => {
    return  await Quiz.count( { $or: listOfAnswerCheck })
}
