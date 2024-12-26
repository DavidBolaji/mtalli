import * as Yup from 'yup'

export const addCategorySchema = Yup.object().shape({
    name: Yup.string().required('Category name is required'),
    description: Yup.string().required('Description is required'),
})