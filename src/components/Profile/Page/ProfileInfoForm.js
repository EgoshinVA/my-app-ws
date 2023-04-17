import {reduxForm} from 'redux-form';
import {
  Input,
  Textarea,
  createField,
} from '../../common/Controls/FormsControls';
import React from 'react';
import classes from "../../common/Controls/FormsControls.module.css";

const ProfileInfoForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <button>save</button>
            </div>
            {props.error && <div className={classes.error}>{props.error}</div>}
            <b>Full name:</b>{createField('Full name', 'fullName', [], Input)}
            <b>Looking for a job:</b>{createField('Looking for a job', 'lookingForAJob', [], Input, {type: 'checkbox'})}
            <b>My professionals
                skills:</b>{createField('My professionals skills', 'lookingForAJobDescription', [], Textarea)}
            <b>About me:</b>{createField('About me', 'aboutMe', [], Textarea)}
            <div>
                <b>Contacts:</b>{Object.keys(props.profile.contacts).map((key) => {
                return <div key={key}>
                    <b>{key}:</b>{createField(key, "contacts." + key, [], Input)}
                </div>
            })
            }
            </div>

        </form>
    );
};

const ProfileInfoFormRedux = reduxForm({form: 'AddNewInfoForm'})(
    ProfileInfoForm
);

export default ProfileInfoFormRedux;
