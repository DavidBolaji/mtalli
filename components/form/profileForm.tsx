'use client'

import { Field, Form, Formik } from "formik"
import * as Yup from "yup"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { UserUploadComponent } from "@/app/(home)/(routes)/profile/components/uplload-image"
import FormikNormalInput2 from "../input/formik-normal-input2"
import { useUser } from "@/hooks/use-user"
import { Button } from "../button/button"
import { useQueryClient } from "@tanstack/react-query"
import { IUser } from "@/actions/get-customers"


const ProfileSchema = Yup.object().shape({
    name: Yup.string().required("Profile name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
})

interface ProfileFormValues {
    name: string
    email: string
    phone: string
}

export default function ProfileForm() {
    const [isEditing] = useState(true)
    const queryClient = useQueryClient()
    const { user, update } = useUser()

    const initialValues = (user: any) => ({
        name: user?.fname ? `${user?.fname} ${user?.lname}` : "",
        email: user?.email as string || "",
        phone: user?.phone as string || "",
    })

    const handleSubmit = async (values: ProfileFormValues) => {
        const user = queryClient.getQueryData(["EDIT_CUSTOMER"]) as IUser
        console.log({ fname: values.name.split(" ")[0], lname: values.name.split(" ")[1], pic: user.pic })
        update({ fname: values.name.split(" ")[0], lname: values.name.split(" ")[1], pic: user.pic })
    }

    useEffect(() => {
        queryClient.setQueryData(["EDIT_CUSTOMER"], (old: IUser) => {
            if (old)
                return {
                    ...old,
                    pic: user?.pic,
                };

            return { pic: user?.pic };
        });
    }, [])

    return (
        <Card className="border-0 shadow-none">
            <CardContent className="pt-6">
                <Formik
                    initialValues={initialValues(user)}
                    validationSchema={ProfileSchema}
                    onSubmit={handleSubmit}
                >
                    {({ }) => (
                        <Form className="space-y-6">
                            <UserUploadComponent view={isEditing} />

                            <div className="space-y-2">
                                <Field
                                    as={FormikNormalInput2}
                                    label="Profile name"
                                    name="name"
                                    className={!isEditing ? "border-transparent bg-transparent" : ""}
                                    readOnly={!isEditing}
                                />
                            </div>

                            <div className="space-y-2">
                                <Field
                                    name="email"
                                    type="email"
                                    label="Email"
                                    as={FormikNormalInput2}
                                    className={!isEditing ? "border-transparent bg-transparent" : ""}
                                    readOnly={true}
                                />
                            </div>

                            <div className="space-y-2">
                                <Field
                                    name="phone"
                                    label="Phone number"
                                    as={FormikNormalInput2}
                                    className={!isEditing ? "border-transparent bg-transparent" : ""}
                                    readOnly={!isEditing}
                                />
                            </div>

                            <div className="w-56 ml-auto">
                                {isEditing && (
                                    <Button size="lg" color="dark" type="submit" className="w-full">
                                        Save Changes
                                    </Button>
                                )}
                            </div>
                        </Form>
                    )}
                </Formik>
            </CardContent>
        </Card>
    )
}

