const { UserFriend, User } = require("../models");
const { v4: uuidv4 } = require("uuid");
const { getMethods } = require("../utils/helpers");

const addFriend = async (requesterUUId, addresseeUUId) => {
  const user = await User.findOne({
    where: {
      uuid: requesterUUId,
    },
  });

  const methods = getMethods(user);

  console.log(methods);

  return {
    user: "user",
  };
};

module.exports = {
  addFriend,
};
