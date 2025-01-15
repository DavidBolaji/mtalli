"use client"
import { RequestForm } from '@/components/form/request-form'
import { useRequestModal } from '@/hooks/use-request-modal'
import { Modal } from 'antd'
import React from 'react'

function RequestModal() {
    const { requestModal, toggleModal } = useRequestModal()
    return (
        <Modal
            open={requestModal}
            onCancel={() => toggleModal(false)}
            footer={null}
        >
            <div className="p-6  w-full">
                <h3 className="lg:text-2xl text-lg font-onest text-center font-medium text-gray-900 mb-4">
                    Request a Destination
                </h3>
                <RequestForm />
            </div>
        </Modal>
    )
}

export default RequestModal
