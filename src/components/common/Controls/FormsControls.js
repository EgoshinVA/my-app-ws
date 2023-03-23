import classes from './FormsControls.module.css';

export const Textarea = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div>
      <div>
        <textarea {...input} {...props} className={hasError && classes.error} />
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
        <input {...input} {...props} className={hasError && classes.error} />
      </div>
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};
