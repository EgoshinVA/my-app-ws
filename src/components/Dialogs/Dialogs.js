import classes from './Dialogs.module.css';
import Interlocutor from './Interlocutor/Interlocutor';
import Messages from './Messages/Messages';
import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import {
  requiredField,
  maxLengthCreator,
} from '../../utils/validators/validators';
import { Textarea } from '../common/Controls/FormsControls';

const Dialogs = (props) => {
  let dialogElements = props.dialogs.map((user) => (
    <Interlocutor name={user.name} id={user.id} />
  ));

  let messagesElements = props.messages.map((message) => (
    <Messages name={message.id} message={message.message} />
  ));

  const addNewMessage = (values) => {
    props.addMessage(values.newMessageBody);
  };

  return (
    <div className={classes.dialogs_page}>
      <div>{dialogElements}</div>
      <div>
        {messagesElements}
        <AddMessageFormRedux onSubmit={addNewMessage} />
      </div>
    </div>
  );
};

const AddMessageForm = (props) => {
  return (
    <Form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          className={classes.input}
          name="newMessageBody"
          placeholder="Your message..."
          validate={[requiredField, maxLengthCreator(30)]}
        />
      </div>
      <div>
        <button className={classes.btn}>Send</button>
      </div>
    </Form>
  );
};

const AddMessageFormRedux = reduxForm({ form: 'dialogNewMessageForm' })(
  AddMessageForm
);

export default Dialogs;
