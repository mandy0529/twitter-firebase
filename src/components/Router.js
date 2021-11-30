import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Profile from '../routes/Profile';
import Navigation from './Navigation';

const Router = ({loggedIn}) => {
  return (
    <BrowserRouter>
      {loggedIn && <Navigation />}
      <Routes>
        <Route path="/" element={loggedIn ? <Home /> : <Auth />} />
        {loggedIn && <Route path="/profile" element={<Profile />} />}
        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
