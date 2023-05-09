import {connect} from 'react-redux';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {createField, Input} from '../common/Controls/FormsControls';
import {login} from '../../redux/auth-reducer';
import {Navigate} from 'react-router-dom';
import React from "react";
import {appStateType} from "../../redux/redux-store";

type mapStatePropsType = {
    isAuth: boolean
    captcha: string | null
}

type mapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type propsType = mapStatePropsType & mapDispatchPropsType

type loginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type loginFormOwnProps = {
    captcha: string | null
}

type loginFormPropertiesTypeKeys = keyof loginFormValuesType

const Login: React.FC<propsType> = (props) => {
    const onSubmit = (formData: loginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    };

    if (props.isAuth) {
        return <Navigate to="/profile"/>;
    }

    return (
        <div>
            Login
            <LoginReduxForm onSubmit={onSubmit} captcha={props.captcha}/>
        </div>
    );
};

const LoginForm: React.FC<InjectedFormProps<loginFormValuesType, loginFormOwnProps> & loginFormOwnProps> = (props) => {
    return (<form onSubmit={props.handleSubmit}>
        <div>
            {createField<loginFormPropertiesTypeKeys>('Email', 'email', [], Input)}
        </div>
        <div>
            {createField<loginFormPropertiesTypeKeys>('Password', 'password', [], Input, {type: 'password', autoComplete: 'on'})}
        </div>
        <div>
            Remember me
            {createField<loginFormPropertiesTypeKeys>('', 'rememberMe', [], "input", {type: 'checkbox'})}
        </div>
        {props.captcha &&
            <div>
                {createField<loginFormPropertiesTypeKeys>('', 'captcha', [], Input)}
                <img alt={'captcha'} src={props.captcha}/>
            </div>}
        <div>
            <button>Login</button>
        </div>
        {props.error && <div>{props.error}</div>}
    </form>);
};

const LoginReduxForm = reduxForm<loginFormValuesType, loginFormOwnProps>({form: 'login'})(LoginForm);

const mapStateToProps = (state: appStateType): mapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        captcha: state.auth.captcha
    };
};

export default connect<mapStatePropsType, mapDispatchPropsType, null, appStateType>(mapStateToProps, {login})(Login);
