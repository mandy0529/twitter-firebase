import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {dbService} from '../fbase';

const Home = () => {
  const [twitter, setTwitter] = useState('');
  const [twitters, setTwitters] = useState([]);

  const getTwitters = async () => {
    const allTwits = await dbService.collection('Tweets').get();
    allTwits.forEach((item) => {
      const newAllTwits = {
        ...item.data(),
        id: item.id,
      };
      setTwitters((prev) => [...prev, newAllTwits]);
    });
  };
  useEffect(() => {
    getTwitters();
  }, []);

  console.log(twitters, 'twitters');
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection('Tweets').add({
      twitter,
      createdAt: Date.now(),
    });
    setTwitter('');
  };
  const handleChange = (e) => {
    const {value} = e.target;
    setTwitter(value);
  };
  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={twitter}
          onChange={handleChange}
          placeholder="what's on your mind ?"
          maxLength={20}
        />
        <input type="submit" value="twitter" />
      </form>
      <section>
        {twitters.map((item) => {
          return (
            <div>
              <h4>{item.twitter}</h4>
            </div>
          );
        })}
      </section>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  text-align: center;
`;
export default Home;
