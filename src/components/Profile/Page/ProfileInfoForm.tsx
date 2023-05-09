import {InjectedFormProps, reduxForm} from 'redux-form';
import {
  Input,
  Textarea,
  createField,
} from '../../common/Controls/FormsControls';
import React from 'react';
import classes from "../../common/Controls/FormsControls.module.css";
import {contactsType, profileType} from "../../../redux/profile-reducer";

export type profileInfoFormValuesType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string | null
    contacts: contactsType
}
type profileInfoFormOwnProps = {
    profile: profileType
}

const ProfileInfoForm: React.FC<InjectedFormProps<profileInfoFormValuesType, profileInfoFormOwnProps> & profileInfoFormOwnProps> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={classes.info}>
            <div className={classes.form}>
                <div>
                    <button className={classes.button_edit}>save</button>
                    {props.error && <div className={classes.error}>{props.error}</div>}
                </div>
                <div className={classes.item}>
                    <b className={classes.text}>Full name:</b>{createField('Full name', 'fullName', [], Input)}
                </div>
                <div className={classes.item}>
                    <b className={classes.text}>Looking for a job:</b>{createField('Looking for a job', 'lookingForAJob', [], Input, {type: 'checkbox'})}
                </div>
                <div className={classes.item}>
                    <b className={classes.text}>My professionals skills:</b>{createField('My professionals skills', 'lookingForAJobDescription', [], Textarea)}
                </div>
                <div className={classes.item}>
                    <b className={classes.text}>About me:</b>{createField('About me', 'aboutMe', [], Textarea)}
                </div>
                <div>
                    {Object.keys(props.profile.contacts).map((key) => {
                    return <div key={key} className={classes.item}>
                        <b className={classes.text}>{key}:</b>{createField(key, "contacts." + key, [], Input)}
                    </div>
                })
                }
                </div>
            </div>
        </form>
    );
};

const ProfileInfoFormRedux = reduxForm<profileInfoFormValuesType, profileInfoFormOwnProps>({form: 'AddNewInfoForm'})(
    ProfileInfoForm
);

export default ProfileInfoFormRedux;
