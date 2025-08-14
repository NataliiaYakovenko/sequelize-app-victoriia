//Кожен студент може вивчати багато предметів
//Кожен предмет можуть вивчати багато студентів

//Users m:n  Subjects

const subject1 = { title: 'Data Bases', hours: 100 };
const subject2 = { title: 'Web-programming', hours: 150 };

const usSubj1 = { userId: 1, subjectId: 1, mark: 100 };
const usSubj2 = { userId: 1, subjectId: 2, mark: 90 };
const usSubj3 = { userId: 2, subjectId: 1, mark: 85 };
const usSubj4 = { userId: 2, subjectId: 2, mark: 88 };

// await Subject.create(subject1);
// await Subject.create(subject2);
// await User_Subject.create(usSubj1);
// await User_Subject.create(usSubj2);
// await User_Subject.create(usSubj3);
// await User_Subject.create(usSubj4);

// Eager Loading

// const userWithSubjects = await User.findAll({
//   raw: true,
//   include: Subject,
// });
// console.log('usersWithSubjects :>> ', usersWithSubjects);

// Lazy Loading

// User.belongsToMany => user.getSubjects
// Subject.belongsToMany => subject.getUser

const user1Inst = await User.findByPk(1);
const subjOfUser1 = await user1Inst.getSubjects({ raw: true });
console.log('subjOfUser1 :>> ', subjOfUser1);
