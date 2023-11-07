const database = 'nwt_project';

// The current database to use.
use(database);

// Create collections.
db.createCollection('users');
db.createCollection('questions');
db.createCollection('surveys');

// The prototype form to create a collection:
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

// Utilisez les IDs des utilisateurs pour créer des questions
db.questions.insert([
    {
        title: "Quelle est votre couleur préférée ?",
        content: "Veuillez sélectionner votre couleur préférée parmi les options suivantes.",
        answers: ["Rouge", "Bleu", "Vert", "Jaune"],
        type: 1, // 1 pourrait représenter un choix unique
        owner: userJohn._id,
        date: new Date()
    },
    {
        title: "Quelle est votre plat préféré ?",
        content: "Veuillez indiquer votre plat préféré parmi les options suivantes.",
        answers: ["Pizza", "Sushi", "Pâtes", "Burger"],
        type: 2, // 2 pourrait représenter un choix multiple
        owner: userAlice._id,
        date: new Date()
    },
    {
        title: "À quelle fréquence faites-vous du sport ?",
        content: "Indiquez la fréquence de vos activités sportives.",
        answers: ["Tous les jours", "2-3 fois par semaine", "Rarement", "Jamais"],
        type: 3, // 3 pourrait représenter une échelle de notation
        owner: userBob._id,
        date: new Date()
    }
]);

db.surveys.insert([
    {
        title: "Sondage sur les loisirs",
        description: "Un sondage sur les loisirs préférés.",
        date: new Date(),
        owner: userJohn._id,
        questions: [
            "Quelle est votre couleur préférée ?",
            "Quelle est votre plat préféré ?"
        ],
        downloads: 0
    },
    {
        title: "Sondage sur la nourriture",
        description: "Un sondage sur les préférences alimentaires.",
        date: new Date(),
        owner: userAlice._id,
        questions: ["À quelle fréquence faites-vous du sport ?"],
        downloads: 0
    }
]);