import {useEffect, useState} from 'react';
import Message from './Message';
import {Button, TextField} from '@material-ui/core';
import styled from 'styled-components';
import {db} from '../firebase';
import FlipMove from 'react-flip-move';

const Form = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // setMessages([...messages, {username: name, text: input}]);
    db.collection('message').add({
      username: name,
      text: input,
      createAt: new Date(),
    });
    setInput('');
  };

  useEffect(() => {
    db.collection('message')
      .orderBy('createAt', 'desc')
      .onSnapshot((item) => {
        const newMessage = item.docs.map((item) => {
          return {
            id: item.id,
            username: item.data().username,
            text: item.data().text,
          };
        });
        setMessages(newMessage);
      });
  }, []);

  useEffect(() => {
    setName(prompt('Set your nickname'));
  }, []);

  return (
    <Wrapper>
      <h1>수빈이와 유정이와 승우와 준현이가 함께하는 비밀의 민지톡 🎅🏻 </h1>
      <h2>파이어족 되자 얘들아</h2>
      {name && <h2> " Welcome {name} "</h2>}

      <form onSubmit={handleSubmit} className="form">
        <TextField
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="write your message"
          focused
          size="small"
          className="text-filed"
        />
        <Button disabled={!input} variant="contained" color="primary">
          send message
        </Button>
      </form>

      <FlipMove>
        {messages.map((item) => {
          return <Message key={item.id} {...item} name={name} />;
        })}
      </FlipMove>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  .form {
    margin-top: 3rem;
  }
  .text-filed {
    width: 30%;
  }
`;
export default Form;
