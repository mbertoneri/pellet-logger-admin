import { messages } from 'services/validations';
import * as yup from 'yup';

export const schema = yup.object().shape({
    stoveBrand: yup.string().required({ message: 'schema:required' }).nullable(),
    stove: yup.string().required({ message: 'schema:required' }).nullable(),
    purchasePrice: yup.number().min(0, messages.gte).typeError({ message: 'schema:number.must_be_a_number' }),
});
