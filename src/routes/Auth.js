import {useState} from 'react';
import styled from 'styled-components';
import {authService, firebaseInstance} from '../fbase';

const Auth = () => {
  const newLogin = {id: '', password: ''};
  const [login, setLogin] = useState(newLogin);
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const toggleAccountBtn = () => setNewAccount((prev) => !prev);

  const handleChange = (e) => {
    const {name} = e.target;
    const {value} = e.target;
    setLogin((prev) => {
      return {...prev, [name]: value};
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data;
    try {
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          login.id,
          login.password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(
          login.id,
          login.password
        );
      }
      console.log(data, 'data');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSocialLogin = async (e) => {
    const {name} = e.target;
    let provider;
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };
  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <label className="login" htmlFor="login">
          log in{' '}
        </label>
        <div>
          id :
          <input
            onChange={handleChange}
            type="text"
            name="id"
            id="id"
            placeholder="write your id"
            value={login.id}
          />
        </div>
        <div>
          password :
          <input
            onChange={handleChange}
            type="password"
            name="password"
            id="password"
            placeholder="write your password"
            value={login.password}
          />
          <input
            className="submit"
            type="submit"
            value={newAccount ? 'create new account' : 'log in'}
          />
        </div>
        <h3>{error && error}</h3>
      </form>
      <button onClick={toggleAccountBtn}>
        {newAccount ? 'login' : 'create new account'}
      </button>
      <button onClick={handleSocialLogin} name="google">
        login with google
      </button>
      <button onClick={handleSocialLogin} name="github">
        login with github
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 3rem auto;
  text-align: center;
  input,
  button {
    border: 1px solid black;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    margin: 1rem 0;
  }

  div {
    font-size: 1rem;
    font-weight: bold;
  }
  .submit {
    background: gold;
  }
`;
export default Auth;
