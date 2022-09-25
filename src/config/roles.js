// Introducir aquí los nombres de los métodos a los que tendrán acceso los diferentes roles.
// Esto se consigue a través del nombre seleccionado en routes

const allRoles = {
  player: [
    'manageTraining',
    'getTraining',
    'getTrainings',
    'manageTrainings',
    'deleteTraining',
    'playerParticipatesTraining',
    'unsubscribePlayerTraining',
  ],
  assistant: [
    'manageTraining',
    'getTraining',
    'getTrainings',
    'manageTrainings',
    'deleteTraining',
    'playerParticipatesTraining',
    'unsubscribePlayerTraining',
  ],
  coach: [
    'manageTraining',
    'getTraining',
    'getTrainings',
    'manageTrainings',
    'deleteTraining',
    'playerParticipatesTraining',
    'unsubscribePlayerTraining',
  ],
  user: [],
  admin: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
