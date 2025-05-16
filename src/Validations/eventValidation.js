import * as Yup from 'yup';

export const eventValidationSchema = (t) => (
    Yup.object().shape({
        image: Yup.mixed()
            .test('fileType', t('imageTypeMsg'), (value) => {
                if (typeof value === 'string') return true;
                return value && value.type?.startsWith('image/');
            })
            .required(t('imageRequiredMsg')),
    
        name: Yup.string()
            .min(3, t('nameMinMsg'))
            .max(100, t('nameMaxMsg'))
            .required(t('nameRequiredMsg')),
    
        location: Yup.string()
            .required(t('locationRequiredMsg')),
    
        type: Yup.string()
            .required(t('typeRequiredMsg')),
    
        date: Yup.date()
            .required(t('dateRequiredMsg')),
    
        seatsNumber: Yup.number()
            .typeError(t('seatsTypeMsg'))
            .integer(t('seatsIntegerMsg'))
            .min(1, t('seatsMinMsg'))
            .required(t('seatsRequiredMsg')),
    
        slogan: Yup.string()
            .required(t('sloganRequiredMsg')),
    
        description: Yup.string()
            .required(t('descriptionRequiredMsg')),
    
        agendaDetails: Yup.array()
            .of(Yup.string().required(t('agendaItemRequiredMsg')))
            .min(1, t('agendaMinMsg'))
            .required(t('agendaRequiredMsg'))
    })
);
