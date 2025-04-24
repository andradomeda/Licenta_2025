const users = [];

function addUser(user) {
  users.push(user);
}

function getAllUsers() {
  return users;
}

function findUserByName(name) {
  return users.find(user => user.name === name);
}

module.exports = {
  addUser,
  getAllUsers,
  findUserByName
};
