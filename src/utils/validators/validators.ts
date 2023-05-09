export type validatorsType = (value: string) => string | undefined

export const requiredField: validatorsType = (value) => {
    if (value) return undefined;
    return 'Field id required';
};

export const maxLengthCreator = (maxLength: number): validatorsType => (value) => {
    if (value && value.length > maxLength) return `Max length is ${maxLength}`;
    return undefined;
};
