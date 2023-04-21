import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import {createField, Input} from './../common/Controls/FormsControls';
import { login} from '../../redux/auth-reducer';
import { Navigate } from 'react-router-dom';


const Login = (props) => {

  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  };

  if (props.isAuth) {
    return <Navigate to="/profile" />;
  }

  return (
    <div>
      Login
      <LoginReduxForm onSubmit={onSubmit} captcha={props.captcha}/>

    </div>
  );
};

const LoginForm = (props) => {
    return (<form onSubmit={props.handleSubmit}>
            <div>
                {createField('Email', 'email', [], Input)}
            </div>
            <div>
                {createField('Password', 'password', [], Input, {type: 'password', autoComplete: 'on'})}
            </div>
            <div>
                Remember me
                {createField('', 'rememberMe', [], "input", {type: 'checkbox'})}
            </div>
        {props.captcha &&
            <div>
                {createField('', 'captcha', [], Input)}
                <img src={props.captcha}/>
            </div>}
            <div>
                <button>Login</button>
            </div>
            {props.error && <div>{props.error}</div>}
        </form>);
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    captcha: state.auth.captcha
  };
};

export default connect(mapStateToProps, { login })(Login);
