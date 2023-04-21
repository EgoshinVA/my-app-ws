import Preloader from '../../common/Preloader/Preloader';
import classes from './Page.module.css';
import StatusProfileWithHooks from './StatusProfileWithHooks';
import ProfileInfoFormRedux from './ProfileInfoForm';
import { useState } from 'react';

const Page = (props) => {
  let [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloader />;
  }

  const onMainPhotoChanged = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData) => {

    props.setProfile(formData).then(()=>{
        setEditMode(false);
    })
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
                                <input onChange={onMainPhotoChanged} name="file" type="file" id="input__file" className={classes.input__file} multiple/>
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

const ProfileInfo = (props) => {
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
        {props.profile.lookingForAJob && <><b>My professional skills : </b>{props.profile.lookingForAJobDescription}</>}
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
              contactValue={props.profile.contacts[key]}
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

const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div className={classes.contact}>
      <b>{contactTitle} : </b> {contactValue}
    </div>
  );
};
export default Page;
