const http = require('http');
const app = require('./app');
// require('dotenv').config()

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';

const httpServer = http.createServer(app);

httpServer.listen(PORT, HOST, () =>
  console.log(`Server is listening http://${HOST}:${PORT}`)
);

console.log(process.env)

//------------------------------------------------------------------

// const newGroup1 = {
//   title: 'nat2022',
//   enteredAt: '2022-09-01',
// };

// const newGroup2 = {
//   title: 'nat2023',
//   enteredAt: '2023-09-01',
// };

// const createGroup1 = await Group.create(newGroup1);
// const createGroup2 = await Group.create(newGroup2);

// console.log(newGroup1,newGroup1 )

// const newUser1 = {
//   firstName: 'Rey',
//   lastName: 'Renger',
//   email: 'rey@gmail.com',
//   passwordHush: '9999',
//   birthday: '1999-11-20',
//   gender: 'male',
//   groupId: 1,
// };

// const newUser2 = {
//   firstName: 'Ntnci',
//   lastName: 'Joy',
//   email: 'nenci@gmail.com',
//   passwordHush: '6666',
//   birthday: '2000-05-12',
//   gender: 'female',
//   groupId: 2,
// };

// const newUser3 = {
//   firstName: 'Liia',
//   lastName: 'lorivna',
//   email: 'liia@gmail.com',
//   passwordHush: '12345',
//   birthday: '2001-04-13',
//   gender: 'female',
//   groupId: 2,
// };
