import { messages } from 'services/validations';
import * as yup from 'yup';

export const schema = yup.object().shape({
    deliveredQuantity: yup.number().min(1, messages.gte).typeError({ message: 'schema:number.must_be_a_number' }),
    unitPrice: yup.number().min(1, messages.gte).typeError({ message: 'schema:number.must_be_a_number' }),
    deliveryPrice: yup.number().min(0).typeError({ message: 'schema:number.must_be_a_number' }),
    pelletBrand: yup.string().required({ message: 'schema:required' }).nullable(),
    createdAt: yup.string().required({ message: 'schema:required' }).nullable(),
});
