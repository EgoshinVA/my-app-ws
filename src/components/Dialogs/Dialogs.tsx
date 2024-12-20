import classes from './Dialogs.module.css';
import Interlocutor from './Interlocutor/Interlocutor';
import Messages from './Messages/Messages';
import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../common/Controls/FormsControls";
import {requiredField} from "../../utils/validators/validators";
import {dialogType, messageType} from "../../redux/dialogs-reducer";

type propsType = {
    dialogs: Array<dialogType>
    messages: Array<messageType>
    addMessage: (value: string) => void
}
type dialogsFormValuesType = {
    newMessageBody: string
}

const Dialogs: React.FC<propsType> = (props) => {
  let dialogElements = props.dialogs.map((user) => (
    <Interlocutor key={user.id} name={user.name} id={user.id} />
  ));

  let messagesElements = props.messages.map((message) => (
    <Messages key={message.id} name={message.id} message={message.message} />
  ));

  const addNewMessage = (values: dialogsFormValuesType) => {
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

const AddMessageForm: React.FC<InjectedFormProps<dialogsFormValuesType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          className={classes.input}
          name="newMessageBody"
          placeholder="Your message..."
          validate={[requiredField]}
        />
      </div>
      <div>
        <button className={classes.btn}>Send</button>
      </div>
    </form>
  );
};

const AddMessageFormRedux = reduxForm<dialogsFormValuesType>({ form: 'dialogNewMessageForm' })(
  AddMessageForm
);

export default Dialogs;
