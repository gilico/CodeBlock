// import React from 'react'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './screens/LandingPage/LandingPage';
import { BrowserRouter as Router, Route, Routes}  from 'react-router-dom';
import MyCodes from './screens/MyCodes/MyCodes';
import SignUp from './screens/SignupPage/SignUp';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import CreateCode from './screens/CreateCode/CreateCode'
import SingleCode from './screens/CreateCode/SingleCode';
import MyFolders from './screens/MyFolders/MyFolders';
import Editor from './components/TextEditorComponent/editor';
import MyProfile from './screens/MyProfile/MyProfile';


// rafce
function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage/>} exact />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/myfolders" element={<MyFolders />} />
          <Route path="/myfolders/:id/mycodes" element={<MyCodes />} />
          <Route path="/myfolders/:id/mycodes/create" element={<CreateCode />} />
          <Route path="/myfolders/:id/update/:codeid" element={<SingleCode />} />
          <Route path='/texteditor' element={<Editor />}/>
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
