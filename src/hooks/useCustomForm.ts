import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form/dist/types';
import { SubmitErrorHandler, SubmitHandler, UnpackNestedValue } from 'react-hook-form/dist/types/form';
import { useDispatch, useSelector } from 'react-redux';
import { mergeErrors } from 'services/mergeErrors';
import { AppDispatch } from 'store';
import { requestSelector } from 'store/request/selectors';
import { resetErrors } from 'store/request/slice';

const useCustomForm = <
    TFieldValues extends FieldValues = FieldValues,
    // eslint-disable-next-line @typescript-eslint/ban-types
    TContext extends object = object,
>(
    props: UseFormProps<TFieldValues, TContext> & {
        onValid: (data: UnpackNestedValue<TFieldValues>) => ReturnType<SubmitHandler<TFieldValues>>;
        onInvalid?: SubmitErrorHandler<TFieldValues>;
    },
): UseFormReturn<TFieldValues, TContext> & {
    handleSubmitPromise: ReturnType<UseFormReturn<TFieldValues, TContext>['handleSubmit']>;
} => {
    const { onValid, onInvalid, ...formProps } = props;
    const dispatch = useDispatch<AppDispatch>();
    const apiViolations = useSelector(requestSelector.selectViolations);
    const formMethods = useForm<TFieldValues, TContext>(formProps);
    const { setError } = formMethods;

    useEffect((): void => {
        dispatch(resetErrors());
    }, []);

    useEffect((): void => {
        mergeErrors(setError, apiViolations);
    }, [setError, apiViolations]);

    const handleErrors: SubmitErrorHandler<TFieldValues> = (errors): void => console.error(errors);

    return { ...formMethods, handleSubmitPromise: formMethods.handleSubmit(onValid, onInvalid || handleErrors) };
};

export default useCustomForm;
