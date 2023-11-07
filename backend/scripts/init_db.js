const database = 'nwt_project';

// The current database to use.
use(database);

// Create collections.
db.createCollection('users');
db.createCollection('questions');
db.createCollection('surveys');

db.users.insert([
    {
        firstname: "John",
        lastname: "Doe",
        email: "johndoe@example.com",
        password: "password123",
        phone: "+33345678901"
    },
    {
        firstname: "Alice",
        lastname: "Smith",
        email: "alicesmith@example.com",
        password: "secret456",
        phone: "+3376543210"
    },
    {
        firstname: "Bob",
        lastname: "Johnson",
        email: "bob.j@example.com",
        password: "mysecurepassword",
        phone: "+33223344556"
    }
]);

const userJohn = db.users.findOne({ email: "johndoe@example.com" });
const userAlice = db.users.findOne({ email: "alicesmith@example.com" });
const userBob = db.users.findOne({ email: "bob.j@example.com" });

db.questions.insert([
    {
        title: "Le drapeau de la France contient 3 couleurs.",
        content: "Veuillez répondre par vrai ou faux.",
        answers: [],
        type: 1,
        owner: userJohn._id,
        date: new Date()
    },
    {
        title: "Quelle est votre plat préféré ?",
        content: "Veuillez indiquer votre plat préféré.",
        answers: [],
        type: 2,
        owner: userAlice._id,
        date: new Date()
    },
    {
        title: "À quelle fréquence faites-vous du sport ?",
        content: "Indiquez la fréquence de vos activités sportives.",
        answers: ["Tous les jours", "2-3 fois par semaine", "Rarement", "Jamais"],
        type: 3,
        owner: userBob._id,
        date: new Date()
    }
]);

const questionA = db.questions.findOne({ title: "Un couscous contient des merguez." });
const questionB = db.questions.findOne({ title: "Quelle est votre plat préféré ?" });
const questionC = db.questions.findOne({ title: "À quelle fréquence faites-vous du sport ?" });

db.surveys.insert([
    {
        title: "Sondage sur la nourriture",
        description: "Un sondage sur la nourriture.",
        date: new Date(),
        owner: userJohn._id,
        questions: [
            questionA,
            questionB
        ],
        downloads: 0
    },
    {
        title: "Sondage sur les loisirs ",
        description: "Un sondage sur vos loisirs.",
        date: new Date(),
        owner: userAlice._id,
        questions: [questionC],
        downloads: 0
    }
]);