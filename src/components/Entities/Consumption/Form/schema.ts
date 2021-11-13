import { messages } from 'services/validations';
import * as yup from 'yup';

export const schema = yup.object().shape({
    quantity: yup.number().min(1, messages.gte).typeError({ message: 'schema:number.must_be_a_number' }),
    supply: yup.string().required({ message: 'schema:required' }).nullable(),
});
