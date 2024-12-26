import * as Yup from "yup";

export const billingNewSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phone: Yup.string()
        .matches(/^\d{10,15}$/, "Phone number must be between 10 and 15 digits")
        .required("Phone number is required"),
    fname: Yup.string().required("First name is required"),
    lname: Yup.string().required("Last name is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    address: Yup.string().required("Address is required"),
    extra: Yup.string(), // Optional
    password: Yup.string(), // Optional
    create: Yup.boolean(),
    save: Yup.boolean(),
    default: Yup.boolean()
});

export const billingPrevSchema = Yup.object({
    address: Yup.string().required("Address is required"),
});

export const editCustomerSchema = Yup.object().shape({
    email: Yup.string()
        .matches(
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            "Invalid email format"
        )
        .required("Email is required"),
    fname: Yup.string().required("First name is required"),
    lname: Yup.string().required("Last name is required"),
    phone: Yup.string().required("Phone is required"),
    pic: Yup.string().notRequired(),
    address: Yup.array().of(
        Yup.object().shape({
            country: Yup.string().required("City is required"),
            city: Yup.string().required("City is required"),
            state: Yup.string().required("State is required"),
            address: Yup.string().required("Addres is required"),
            info: Yup.string().optional(),
            active: Yup.boolean().required(),
        })
    ),
    orderAddress: Yup.array().optional()
});

export const createOrderSchema = Yup.object().shape({
    email: Yup.string()
        .matches(
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            "Invalid email format"
        )
        .required("Email is required"),
    fname: Yup.string().required("First name is required"),
    lname: Yup.string().required("Last name is required"),
    phone: Yup.string().required("Phone is required"),
    country: Yup.string().required("City is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    address: Yup.string().required("Addres is required"),
    info: Yup.string(),
    active: Yup.boolean().required(),
});