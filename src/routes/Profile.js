import {Link, useNavigate} from 'react-router-dom';
import {authService} from '../fbase';

const Profile = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    authService.signOut();
    navigate('/');
  };

  return (
    <>
      <h1>profile</h1>
      <button onClick={handleLogOut}>log0ut</button>
    </>
  );
};
export default Profile;
