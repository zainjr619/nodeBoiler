const UPLOAD_MEDIA = (message) => ({
  code: 404,
  message: message,
});
const YOU_CANNOT_YOURSELF = (message) => ({
 message, id: 402,
});
module.exports = {
  SOMETHING: {
    code: 400,
    message: 'Something went wrong',
  },
  AUTH_TOKEN_EXPIRED: {
    code: 400,
    message: 'Auth token expired ',
  },
  USER_NOT_FOUND: {
    code: 401,
    message: 'User not found',
  },
  USER_ALREADY_EXISTS: {
    code: 401,
    message: 'User Already Exists',
  },
  USER_NAME_NOT_UNIQUE: {
    code: 403,
    message: 'Username is not unique',
  },
  COMMENT_NOT_FOUND: {
    code: 402,
    message: 'Comment not found',
  },
  REACTION_FOUND: {
    code: 402,
    message: 'ALREADY REACTED',
  },
  REACTION_NOT_FOUND: {
    code: 402,
    message: 'Reaction not found',
  },
  YOU_CANNOT_YOURSELF,
  UPLOAD_MEDIA
};
