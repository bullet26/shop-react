import { FC, useContext } from 'react';
import { Formik, Form, useField, FormikProps } from 'formik';
import * as Yup from 'yup';
import { PatternFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks';
import { selectAllCart } from '../slices/cartSlice';
import { ContextStore } from '../../context';
import s from './CheckoutForm.module.scss';
import { CustomerInfo } from '../../type/interface';

interface IMyInput {
    label: string;
    id: string;
    name: string;
    type: 'text' | 'email' | 'number' | 'checkbox';
    autoComplete?: string;
}

interface IMyCheckbox {
    name: string;
    children: string | JSX.Element;
    props?: {};
}

interface IMySelect {
    label: string;
    name: string;
    id: string;
    children: string | JSX.Element;
    props?: {};
}

const MyInput = ({ label, ...props }: IMyInput) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label className={s.label} htmlFor={props.name}>
                {label}
            </label>
            <input className={s.input} {...field} {...props} />
            {meta.touched && meta.error ? <div className={s.error}>{meta.error}</div> : null}
        </>
    );
};

const MySelect = ({ label, ...props }: IMySelect) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label className={s.label} htmlFor={props.name}>
                {label}
            </label>
            <select className={s.input} {...field} {...props}></select>
            {meta.touched && meta.error ? <div className={s.error}>{meta.error}</div> : null}
        </>
    );
};
const MyCheckbox = ({ children, ...props }: IMyCheckbox) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <>
            <label className={s.label}>
                <input type='checkbox' {...field} {...props} />
                {children}
            </label>
            {meta.touched && meta.error ? <div className={s.error}>{meta.error}</div> : null}
        </>
    );
};

const CheckoutForm: FC = () => {
    const navigate = useNavigate();
    const { setСustomerInfo } = useContext(ContextStore);
    const carts = useAppSelector(selectAllCart);
    let totalPrice = 0;

    carts.forEach(item => {
        totalPrice += item.price * (item.quant || 1);
    });

    const PhoneNumber = ({ label, ...props }: IMyInput) => {
        const [, meta, helpers] = useField(props);

        return (
            <>
                <label className={s.label} htmlFor={props.name}>
                    {label}
                </label>
                <PatternFormat
                    id={props.id}
                    name={props.name}
                    className={s.input}
                    format='+38 (###) ### ## ##'
                    allowEmptyFormatting
                    mask='#'
                    onValueChange={input => helpers.setValue(input.value, true)}
                />
                {meta.touched && meta.error ? <div className={s.error}>{meta.error}</div> : null}
            </>
        );
    };

    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    surname: '',
                    age: 0,
                    address: '',
                    phone: '',
                    terms: false,
                }}
                validationSchema={Yup.object({
                    name: Yup.string().min(2, 'Minimum 2 letters to fill').required('Required field!'),
                    surname: Yup.string().min(2, 'Minimum 2 letters to fill').required('Required field!'),
                    age: Yup.number().positive('Age must be a positive').required('Age is required'),
                    address: Yup.string().required('Address is required').min(10, 'Minimum 10 letters to fill'),
                    delivery: Yup.string().required('Required field!'),
                    payment: Yup.string().required('Required field!'),
                    phone: Yup.string().required('Enter your mobile phone number').min(10, 'Minimum 10 numbers to fill'),
                    terms: Yup.boolean().required('You have to agree').oneOf([true], 'You have to agree'),
                })}
                onSubmit={(values, { resetForm }) => {
                    setСustomerInfo(values);
                    console.log(JSON.stringify(values, null, 2));
                    resetForm();
                    navigate('/shop/result');
                }}
            >
                {(props: FormikProps<CustomerInfo>) => (
                    <div className={s.wrapper}>
                        <Form className={s.form}>
                            <h2>Checkout</h2>
                            <div className={s.price}>Total price - {totalPrice} $</div>
                            <MyInput label='Your name' id='name' name='name' type='text' />
                            <MyInput label='Your surname' id='surname' name='surname' type='text' />
                            <MyInput label='Your age' id='age' name='age' type='number' />
                            <MyInput label='Delivery address' id='address' name='address' type='text' />
                            <PhoneNumber label='Phone number' id='phone' name='phone' type='text' />
                            <MySelect label='Delivery type' id='delivery' name='delivery'>
                                <>
                                    <option value=''>Choice delivery type</option>
                                    <option value='courier'>Courier</option>
                                    <option value='post-office'>Pick up at the post office</option>
                                </>
                            </MySelect>
                            <MySelect label='Payment type' id='payment' name='payment'>
                                <>
                                    <option value=''>Choice payment type</option>
                                    <option value='cash'>Cash</option>
                                    <option value='card'>Card</option>
                                    <option value='gp'>Google pay / Apple pay</option>
                                    <option value='prepayment'>Prepayment</option>
                                </>
                            </MySelect>
                            <MyCheckbox name='terms'>Consent to the processing of personal data</MyCheckbox>
                            <button className={s.submit} type='submit'>
                                CHECKOUT
                            </button>
                        </Form>
                    </div>
                )}
            </Formik>
        </>
    );
};

export default CheckoutForm;
