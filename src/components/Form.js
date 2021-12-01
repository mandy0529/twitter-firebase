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
  }, [name]);

  return (
    <Wrapper>
      <h1>Facebook Messenger</h1>
      {name && <h2> " Welcome {name} "</h2>}

      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="write your message"
          focused
          size="small"
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
`;
export default Form;
