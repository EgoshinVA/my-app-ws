import classes from './FormsControls.module.css';
import {Field, WrappedFieldProps} from "redux-form";
import {validatorsType} from "../../../utils/validators/validators";
import React from "react";

export const Textarea: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div>
            <div>
                <textarea {...input} {...props} className={hasError ? classes.error : undefined}/>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    );
};

export const Input: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div>
            <div>
                <input {...input} {...props} className={hasError ? classes.error : undefined}/>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    );
};

export function createField<formKeysType extends string>(
                            placeholder: string | undefined,
                            name: formKeysType,
                            validators: Array<validatorsType>,
                            component: React.FC<WrappedFieldProps> | string,
                            props = {},
                            text = ''){
    return <div>
        <Field placeholder={placeholder} name={name}
               validate={validators}
               component={component}
               {...props}
        /> {text}
    </div>
}
