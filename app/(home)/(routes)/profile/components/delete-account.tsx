import { DeleteForm } from '@/components/form/delete-form'
import React from 'react'

const DeleteAccount = () => {
    return (
        <div>
            <h1 className='font-onest text-2xl black-100 mb-6 font-normal'>
                Delete Account
            </h1>
            <p className='font-onest text-base font-bold black-100 mb-2'>
                Delete Deletion Disclaimer
            </p>

            <p className='font-onest text-sm font-normal black-100 '>
                By proceeding with this action, you are requesting to permanently delete your account. This action is irreversible. Deleting your account will result in:
            </p>
            <ul>
                <li className='font-onest text-sm font-normal black-100 '>
                    Loss of All Data: All your data, including personal information, preferences, and any content or files associated with your account, will be permanently erased and cannot be recovered.
                </li>
            </ul>
            <p className='font-onest text-sm mt-2 font-normal black-100 '>

                If you&apos;re sure you want to delete your account, please confirm below. For other options, such as temporary deactivation, please contact our support team.
            </p>
            <div className='mt-6'>
                <DeleteForm />
            </div>
        </div>
    )
}

export default DeleteAccount
