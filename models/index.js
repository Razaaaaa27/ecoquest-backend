const User = require('./user');
const Challenge = require('./challenge');
const Forest = require('./forest');
const Post = require('./post');
const EduContent = require('./educontent');
const Submission = require('./submission');
const ChallengeSubmission = require('./challengeSubmission');

// Export models with PascalCase names for consistency with Mongoose models
module.exports = {
  User,
  Challenge,
  Forest,
  Post,
  EduContent,
  Submission,
  ChallengeSubmission
}; 