const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middlewares/authMiddleware');
const authRoute = require('./routes/authRoute');
const path = require('path');
const dotenv = require('dotenv');


const notes = require('./data/notes');


const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

/* --- set statics --- */
app.set('view engine', 'ejs');
const publicPath = path.join(__dirname, "../frontend/public")
app.use(express.static(publicPath));
const templatesPath = path.join(__dirname, "../frontend/views")
app.set("views", templatesPath);


/*--- routes --- */
app.get('*', checkUser);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const note = notes.find((n) => n._id === req.params.id);
  res.send(note);
})



app.use(authRoute);
  

/*---- connect to mongo + upload server*/
const PORT = process.env.PORT || 3000;
const dbURI = "mongodb+srv://gil:GILco235689@codebookcluster.xqwhy.mongodb.net/CodeBook"

mongoose.connect(dbURI,  { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
  }))
  .catch((err) => console.log(err));
;