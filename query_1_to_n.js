// sync db by model
const { sequelize, User, Group } = require('./models');
const { Op } = require('sequelize');

// DROP TABLE IF EXISTS "User" CASCADE;
// CREATE TABLE IF NOT EXISTS "User" (
//   "id"   SERIAL ,
//   "firstName" VARCHAR(255) NOT NULL,
//   "lastName" VARCHAR(255) NOT NULL,
//   "email" VARCHAR(255) UNIQUE,
//   "birthday" TIMESTAMP WITH TIME ZONE,
//   "isMale" BOOLEAN,
//   "activitiesCount" INTEGER DEFAULT 0,
//   "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
//   "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
//   PRIMARY KEY ("id")
// );

// sequelize
//   .sync({ force: true })
//   .then(() => console.log('Sync Ok'))
//   .catch(err => console.log('err :>> ', err));

// (async function () {
//   // CRUD
//   //
//   // C - INSERT - create --------------------------
//   //
//   // INSERT INTO "User" ("id","firstName","lastName","email","birthday","isMale","activitiesCount","createdAt","updatedAt")
//   // VALUES (DEFAULT,$1,$2,$3,$4,$5,$6,$7,$8)
//   // RETURNING "id","firstName","lastName","email","birthday","isMale","activitiesCount","createdAt","updatedAt";

//   const newUser = {
//     firstName: 'Test',
//     lastName: 'Testovych',
//     email: 'm@m6.com',
//     birthday: '1990-06-11',
//     isMale: true,
//   };

//   const createdUser = await User.create(newUser);
//   console.log('createdUser :>> ', createdUser.get()); // get() -> plain object

//   // R - SELECT - findAll / findOne / findByPk -----------------------------
//   //
//   // SELECT "id", "firstName", "lastName", "email", "birthday", "isMale", "activitiesCount", "createdAt", "updatedAt"
//   // FROM "users" AS "Users";

//   const foundUser = await User.findAll({ raw: true }); // { raw: true } -> plain object
//   console.log('foundUser :>> ', foundUser);

//   const foundUser = await User.findByPk(1, { raw: true }); // пошук по primary key
//   console.log('foundUser :>> ', foundUser);

//   // Проєкція - attributes -----
//   // SELECT firstName, email ...

//   const foundUser = await User.findAll({
//     raw: true,
//     attributes: ['firstName', 'email'],
//   });
//   console.log('foundUser :>> ', foundUser);

//   // Проєкція "навпаки" - exclude

//   // вивести все окрім 'createdAt', 'updatedAt'
//   const foundUser = await User.findAll({
//     raw: true,
//     attributes: { exclude: ['createdAt', 'updatedAt'] },
//   });
//   console.log('foundUser :>> ', foundUser);

//   // Пагінація + сортування -----
//   //
//   // сортування - ORDER BY - order
//   // пагінація - LIMIT OFFSET - limit offset
//   //
//   // SELECT "id", "firstName", "lastName", "email", "birthday", "isMale", "activitiesCount"
//   // FROM "User" AS "User"
//   // ORDER BY "User"."id" DESC
//   // LIMIT 2 OFFSET 2;

//   const foundUser = await User.findAll({
//     raw: true,
//     order: [['id', 'DESC']],
//     limit: 2,
//     offset: 2,
//     attributes: { exclude: ['createdAt', 'updatedAt'] },
//   });
//   console.log('foundUser :>> ', foundUser);

//   // Task: Додати дані в таблицю
//   // і отримати другу сторінку при перегляді по 3 рядки,
//   // впорядкувавши за іменем

//   const foundUser = await User.findAll({
//     raw: true,
//     order: ['firstName'],
//     limit: 3,
//     offset: 3,
//   });
//   console.log(foundUser);

//   // Фільтрація -----
//   // WHERE - where

//   // id = 3;
//   const foundUser = await User.findAll({
//     raw: true,
//     where: {
//       id: 3,
//     },
//   });
//   console.log(foundUser);

//   // isMale = true AND email = 'm@m2.com'
//   const foundUser = await User.findAll({
//     raw: true,
//     where: {
//       isMale: true,
//       email: 'm@m2.com',
//     },
//   });
//   console.log(foundUser);

//   // const { Op } = require('sequelize'); - операції <>, <, <=, IN, ...

//   // id = 5 OR email = 'm@m.com'
//   const foundUser = await User.findAll({
//     raw: true,
//     where: {
//       [Op.or]: [{ id: 5 }, { email: 'm@m.com' }],
//     },
//   });
//   console.log(foundUser);

//   // Task: Вивести чоловіків або у кого кількість активностей = 0
//   const foundUser = await User.findAll({
//     raw: true,
//     where: {
//       [Op.or]: [{ isMale: true }, { activitiesCount: 0 }],
//     },
//   });
//   console.log(foundUser);

//   // Використання функцій -----
//   // sequelize.fn('ФУНКЦІЯ', sequelize.col('СТОВПЧИК'))

//   // Додати COUNT(id)
//   const usersCount = await User.findAll({
//     raw: true,
//     attributes: [sequelize.fn('COUNT', sequelize.col('id'))],
//   });
//   console.log('usersCount :>> ', usersCount);

//   // + Додавання стовпчика - include

//   // Додати стовпчик з віком
//   const foundUser = await User.findAll({
//     raw: true,
//     attributes: {
//       include: [[sequelize.fn('age', sequelize.col('birthday')), 'stud_age']],
//     },
//   });
//   console.log('foundUser :>> ', foundUser);

//   // Нестандартні для sequelize операції прописуються чистим SQL:
//   // sequelize.literal('SQL-код')

//   const foundUser = await User.findAll({
//     raw: true,
//     attributes: {
//       include: [
//         [sequelize.literal('EXTRACT (YEAR FROM age(birthday))'), 'stud_age'],
//       ],
//     },
//   });
//   console.log('foundUser :>> ', foundUser);

//   // *GROUP BY + HAVING - group + having -----

//   const foundUser = await User.findAll({
//     raw: true,
//     attributes: [
//       'isMale',
//       [
//         sequelize.fn('sum', sequelize.col('activitiesCount')),
//         'stud_activitiesCount',
//       ],
//     ],
//     group: 'isMale',
//     having: sequelize.literal('sum("activitiesCount") >= 0'),
//   });
//   console.log('foundUser :>> ', foundUser);

//   // U - UPDATE - update (як, опції)
//   // => [ кількість_оновлених ]                без returning: true
//   // => [ кількість_оновлених, масив оновлених ] з returning: true

//   const updatedUser = await User.update(
//     { firstName: 'Ivo' },
//     {
//       where: { id: 1 },
//       raw: true,
//       returning: true, // повернути оновлений рядок
//     }
//   );

//   console.log('updatedUser :>> ', updatedUser[1][0]);

//   // D - DELETE - destroy
//   // => кількість оновлених

//   const deletedUserCount = await User.destroy({
//     where: {
//       id: 1,
//     },
//   });
//   console.log('deletedUserCount :>> ', deletedUserCount);
// })();

//

(async function () {
  //   user n:1 group
  //  User(firstName, ..., groupId REFERENCES group)

//   const newGroup1 = { title: 'pe2022-1', enteredAt: '2022-01-01' };
//   const newGroup2 = { title: 'pe2023-1', enteredAt: '2023-01-01' };

  const createdGroup1 = await Group.create(newGroup1);
  const createdGroup2 = await Group.create(newGroup2);

  console.log(createdGroup1, createdGroup2);

  // const User1 = {
  //   firstName: 'Test',
  //   lastName: 'Testovych',
  //   email: 'm@m1.com',
  //   groupId: 1,
  // };

  // const User2 = {
  //   firstName: 'Test',
  //   lastName: 'Testovych',
  //   email: 'm@m2.com',
  //   groupId: 1,
  // };

  // const User3 = {
  //   firstName: 'Test',
  //   lastName: 'Testovych',
  //   email: 'm@m3.com',
  //   groupId: 2,
  // };

  // const createdUser1 = await User.create(newUser1);
  // const createdUser2 = await User.create(newUser2);
  // const createdUser3 = await User.create(newUser3);
  // console.log(createdUser1, createdUser2, createdUser3);

  // Eager Loading ~ JOINS - отримаємо інформацію з усіх моделей (foreign keys)
  // const foundUserWithGroups = await User.findAll({
  //   raw: true,
  //   include: 'Group',
  // });

  // console.log('foundUserWithGroups :>> ', foundUserWithGroups);

  // const foundGroupsWithUser = await Group.findAll({
  //   raw: true,
  //   include: 'User',
  // });
  // console.log('foundGroupsWithUser :>> ', foundGroupsWithUser);

  // Lazy loading - отримаємо інформацію з пов'язаної моделі (associations)

  //  User.belongsTo => user.getGroup(), ...
  // const user1Inst = await User.findByPk(1);
  // const groupOfUser1 = await user1Inst.getGroup({ raw: true });
  // console.log('groupOfUser1 :>> ', groupOfUser1);

  // Group.hasMany => group.getUser(), ...
  // const group1Inst = await Group.findByPk(1);
  // const userOfGroup1 = await group1Inst.getUser({ raw: true });
  // console.log('userOfGroup1 :>> ', userOfGroup1);
})();