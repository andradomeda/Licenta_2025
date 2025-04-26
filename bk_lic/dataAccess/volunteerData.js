const volunteers = [];

function addVolunteer(volunteer) {
  volunteers.push(volunteer);
}

function getAllVolunteers() {
  return volunteers;
}

function findVolunteerByName(name) {
  return volunteers.find(volunteer => volunteer.name === name);
}

module.exports = {
  addVolunteer,
  getAllVolunteers,
  findVolunteerByName
};
