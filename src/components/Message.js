import {Card, CardContent, Typography} from '@material-ui/core';
import {forwardRef} from 'react';

const Message = forwardRef(({username, text, name}, ref) => {
  const isMine = username === name;
  return (
    <Card ref={ref} className={`message ${isMine ? 'isMine' : 'isYours'}`}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {username}: {text}
        </Typography>
      </CardContent>
    </Card>
  );
});

export default Message;
