// Introducir aquí los nombres de los métodos a los que tendrán acceso los diferentes roles.
// Esto se consigue a través del nombre seleccionado en routes

const allRoles = {
  player: [],
  assistant: [],
  coach: [],
  user: [],
  admin: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
