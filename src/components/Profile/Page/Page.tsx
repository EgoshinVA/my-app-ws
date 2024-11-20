import Preloader from '../../common/Preloader/Preloader';
import classes from './Page.module.css';
import StatusProfileWithHooks from './StatusProfileWithHooks';
import ProfileInfoFormRedux, {profileInfoFormValuesType} from './ProfileInfoForm';
import React, {ChangeEvent, useState} from 'react';
import {contactsType, profileType} from "../../../redux/profile-reducer";

type propsType = {
    profile: profileType | null
    isOwner: boolean
    status: string

    savePhoto: (file: any) => void
    setProfile: (formData: profileInfoFormValuesType) => void
    updateUserStatus: (status: string) => void
}

const Page: React.FC<propsType> = (props) => {
    let [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader/>;
    }

    const onMainPhotoChanged = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.files &&
        props.savePhoto(e.target.files[0]);

    };

    const onSubmit = (formData: profileInfoFormValuesType) => {
        props.setProfile(formData);
        setEditMode(false);

    };

    return (
        <>
            <div className={classes.page}>
                <div className={classes.page_photo}>
                    <img
                        src={
                            props.profile.photos.large ||
                            'https://www.meme-arsenal.com/memes/f829154b6247042d8821a19015eb2f7c.jpg'
                        }
                        className={classes.avatar}
                        alt="img"
                    />
                    {props.isOwner && (
                        <div>
                            <div className={classes.input__wrapper}>
                                <input onChange={onMainPhotoChanged} name="file" type="file" id="input__file"
                                       className={classes.input__file} multiple/>
                                <label htmlFor="input__file" className={classes.button}>
                                    <span className={classes.button_text}>Выберите файл</span>
                                </label>
                            </div>


                        </div>


                    )}
                </div>
                {editMode ?
                    <ProfileInfoFormRedux
                        initialValues={props.profile}
                        onSubmit={onSubmit}
                        profile={props.profile}
                    />
                    :
                    <ProfileInfo
                        profile={props.profile}
                        isOwner={props.isOwner}
                        goToEditMode={() => {
                            setEditMode(true);
                        }}
                        status={props.status}
                        updateUserStatus={props.updateUserStatus}
                    />
                }
            </div>

        </>
    );
};

type profileInfoPropsType = {
    isOwner: boolean
    profile: profileType
    status: string

    updateUserStatus: (status: string) => void
    goToEditMode: () => void
}

const ProfileInfo: React.FC<profileInfoPropsType> = (props) => {
    return (
        <div className={classes.info}>
            {props.isOwner && <button className={classes.button_edit} onClick={props.goToEditMode}>edit</button>}
            <div>
                <b>Full name : </b>
                {props.profile.fullName}
            </div>
            <div>
                <b>Looking for a job : </b>
                {props.profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            <div>
                {props.profile.lookingForAJob && <><b>My professional skills
                    : </b>{props.profile.lookingForAJobDescription}</>}
            </div>
            <div>
                <b>About me : </b>
                {props.profile.aboutMe}
            </div>
            <div>
                <b>Contacts : </b>
                {Object.keys(props.profile.contacts).map((key) => {
                    return (
                        <Contact
                            key={key}
                            contactTitle={key}
                            contactValue={props.profile.contacts[key as keyof contactsType]}
                        />
                    );
                })}
            </div>
            <b>Status : </b>
            <StatusProfileWithHooks
                status={props.status}
                updateUserStatus={props.updateUserStatus}
            />

        </div>
    );
};

type contactPropsType = {
    contactTitle: string
    contactValue: string
}

const Contact: React.FC<contactPropsType> = ({contactTitle, contactValue}) => {
    return (
        <div className={classes.contact}>
            <b>{contactTitle} : </b> {contactValue}
        </div>
    );
};
export default Page;
