const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const postRoutes = require('./routes/post');
const db = require('./models/index');
const modelPost = require('./models/post');
const bodyParser = require('body-parser');

// parse application/json
app.use(bodyParser.json());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(postRoutes);    
modelPost(db.sequelize);

app.db = db;

// db.sequelize.sync().then(() => {
//     // populate author table with dummy data
//     // db.post.bulkCreate(
//     //   times(10, () => ({
//     //     firstName: faker.name.firstName(),
//     //     lastName: faker.name.lastName()
//     //   }))
//     // );
// });

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
module.exports = app;
