import * as Yup from 'yup';

export const loginValidationSchema = (t) => (
    Yup.object({
        email: Yup.string()
            .required(t('emailRequiredWord'))
            .email(t('emailInvalidWord')),
            
        password: Yup.string()
            .required(t('passwordRequiredWord'))
    })
);

export const signupValidationSchema = (t) => (
    Yup.object({
        name: Yup.string()
            .required(t('nameRequiredWord')),
        
        email: Yup.string()
            .email(t('emailInvalidWord'))
            .required(t('emailRequiredWord')),
        
        password: Yup.string()
            .min(6, t('passwordMinWord'))
            .required(t('passwordRequiredWord')),
        
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], t('passwordMustMatchWord'))
            .required(t('confirmPasswordRequiredWord'))
    })
);