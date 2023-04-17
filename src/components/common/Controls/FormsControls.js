import classes from './FormsControls.module.css';
import {Field} from "redux-form";

export const Textarea = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div>
      <div>
        <textarea {...input} {...props} className={hasError ? classes.error : undefined} />
      </div>
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};

export const Input = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div>
      <div>
        <input {...input} {...props}  className={hasError ? classes.error : undefined} />
      </div>
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};

export const createField = (placeholder, name, validators, component, props={}, text='') => (
    <div>
        <Field placeholder={placeholder} name={name}
               validate={validators}
               component={component}
               {...props}
        /> {text}
    </div>
)
