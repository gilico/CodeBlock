const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');
const { requireAuth, checkUser } = require('./middlewares/authMiddleware');
const authRoutes = require('./routes/authRoute');
const folderRoutes = require('./routes/foldersRoute')
const connectDB = require('./config/db');

const app = express();
dotenv.config();
connectDB();

app.use(express.json()); // exept jaon data from user
app.use(cookieParser());

/*--- routes --- */
app.get('*', checkUser);


app.use('/api/myfolders', folderRoutes);

app.use("/api/users", authRoutes);

//----deployment----------
__dirname = path.resolve();
if(process.env.NODE_ENV === 'production')
{
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}
else
{
  app.get('/', (req, res) => {
    res.send('api is runing');
  })
}




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
