import * as Yup from "yup";


export const promotionDetailSchema = Yup.object().shape({
  name: Yup.string().required("Promotion name is required"),
  code: Yup.string().required("Promotion code is required"),
  discount: Yup.number().required("Promotion discount is required").integer("Product discount must be number"),
  startDate: Yup.string().required("Promotion start date is required"),
  endDate: Yup.string().required("Promotion end date is required"),
  startTime: Yup.string().required("Promotion start time is required"),
  endTime: Yup.string().required("Promotion end time is required"),
});


// Combine all schemas 
export const allPromotionSchema = Yup.object().shape({
  ...promotionDetailSchema.fields,
});
