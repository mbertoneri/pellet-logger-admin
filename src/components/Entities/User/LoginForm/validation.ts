import * as yup from 'yup';

export const schema = yup.object().shape({
    email: yup.string().required({ message: 'schema:required' }),
    password: yup.string().required({ message: 'schema:required' }),
});
