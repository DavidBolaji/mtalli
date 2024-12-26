import * as Yup from "yup";

export const eventImageSchema = Yup.object().shape({
  images: Yup.array()
    .min(1, "Please upload at least one image")
    .max(5, "You can only upload up to 5 images")
    .required("Images are required"),
});

export const eventDetailsSchema = Yup.object().shape({
  title: Yup.string().required("Event title is required"),
  totalSlots: Yup.string().required("Event slot is required"),
  location: Yup.string().required("Event location is required"),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string().required("End dateis required"),
  price: Yup.string().required("Event travel fee is required"),
  serviceFee: Yup.string().required("Event service fee is required"),
  description: Yup.string().required("Event description is required"),
});

export const eventInfoSchema = Yup.object().shape({
  info: Yup.string().required("Event info is required"),
});

export const eventRulesSchema = Yup.object().shape({
  rules: Yup.string().required("Event rules is required"),
});

export const eventPolicySchema = Yup.object().shape({
  policy: Yup.string().required("Policy rules is required"),
});

// Combine all schemas 
export const allEventSchema = Yup.object().shape({
  ...eventDetailsSchema.fields,
  ...eventImageSchema.fields,
  ...eventInfoSchema.fields,
  ...eventRulesSchema.fields,
  ...eventPolicySchema.fields
});
