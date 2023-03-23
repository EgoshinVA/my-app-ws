import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  requiredField,
  maxLengthCreator,
} from './../../utils/validators/validators';
import { Input } from './../common/Controls/FormsControls';
import { login } from './../../redux/auth-reducer';
import { Navigate } from 'react-router-dom';

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe);
  };

  if (props.isAuth) {
    return <Navigate to="/profile/27293" />;
  }

  return (
    <div>
      Login
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder={'Email'}
          component={Input}
          name={'email'}
          validate={[requiredField, maxLengthCreator(30)]}
        />
      </div>
      <div>
        <Field
          placeholder={'Password'}
          component={Input}
          name={'password'}
          validate={[requiredField, maxLengthCreator(30)]}
          type={'password'}
        />
      </div>
      <div>
        <Field component="input" type={'checkbox'} name={'rememberMe'} />
        Remember me
      </div>
      <div>
        <button>Login</button>
      </div>
      {props.error && <div>{props.error}</div>}
    </form>
  );
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps, { login })(Login);
