import Profile from './Profile';
import React, {useEffect} from 'react';
import {
    getProfileData,
    getUserStatus,
    updateUserStatus,
    savePhoto, setProfile, profileType
} from '../../redux/profile-reducer';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import {compose} from 'redux';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {appStateType} from "../../redux/redux-store";
import {profileInfoFormValuesType} from "./Page/ProfileInfoForm";

type mapStatePropsType = {
    profile: profileType | null
    status: string
    userId: number | null
}

type mapDispatchPropsType = {
    getProfileData: (userId: number | null) => void
    getUserStatus: (userId: number | null) => void
    updateUserStatus: (status: string) => void
    savePhoto: (file: any) => void
    setProfile: (formData: profileInfoFormValuesType) => void
}

type ownPropsType = {}

type propsType = mapStatePropsType & mapDispatchPropsType & ownPropsType

const ProfileContainer: React.FC<propsType> = (props) => {

    let refreshProfile = () => {
        let userId: number | null = Number(params.userId);
        if (!userId) {
            userId = props.userId
        }
        props.getProfileData(userId);
        props.getUserStatus(userId);
    }
    let params = useParams()

    useEffect(() => {
        refreshProfile();
    }, [])

    useEffect(() => {
        refreshProfile();
    }, [props.userId, params.userId])


    return (
        <Profile
            isOwner={!params.userId}
            {...props}
            profile={props.profile}
            status={props.status}
            updateUserStatus={props.updateUserStatus}
            savePhoto={props.savePhoto}
            setProfile={props.setProfile}
        />
    );
}

let mapStateToProps = (state: appStateType): mapStatePropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        userId: state.auth.userId
    };
};

export default compose(
    withAuthRedirect,
    connect<mapStatePropsType, mapDispatchPropsType, ownPropsType, appStateType>(mapStateToProps, {
        getProfileData,
        getUserStatus,
        updateUserStatus,
        savePhoto,
        setProfile})
)(ProfileContainer);
