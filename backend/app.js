const express = require('express');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middlewares/authMiddleware');
const authRoutes = require('./routes/authRoute');
const folderRoutes = require('./routes/foldersRoute')

const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const app = express();
dotenv.config();
connectDB();

app.use(express.json()); // exept jaon data from user
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

app.use('/api/myfolders', folderRoutes);

app.use("/api/users", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
