import React, { useState } from 'react';
import { Form, TextArea, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { editTaskText } from '../../AC';

const TaskText = ({
  textFromServer, isAdmin, id, editTaskText: editTextAction,
}) => {
  const [text, setText] = useState(textFromServer);
  const onSubmit = (e) => {
    e.preventDefault();
    editTextAction(text, id);
  };
  return (
    <Form onSubmit={onSubmit}>
      <TextArea value={text} onChange={e => (isAdmin ? setText(e.target.value) : null)} />
      {isAdmin && (
        <Button inverted color="blue" type="submit">
          Edit
        </Button>
      )}
    </Form>
  );
};

export default connect(
  ({ tasks }) => ({ tasks }),
  { editTaskText }
)(TaskText);
