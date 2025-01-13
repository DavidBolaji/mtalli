"use server"

import db from '@/db/db';
import webpush from 'web-push'


webpush.setVapidDetails(
    'https://gomtalii.com',
    process.env.NEXT_PUBLIC_VAPID_KEY!,
    process.env.VAPID_PRIVATE_KEY!
)

export const sendNotification = async (
    message: string,
    user_id: string,
    icon: string,
    name: string
) => {
    
    const vapidKeys = {
        publicKey: process.env.NEXT_PUBLIC_VAPID_KEY!,
        privateKey: process.env.VAPID_PRIVATE_KEY!
    }

    webpush.setVapidDetails(
        "https://gomtalii.com",
        vapidKeys.publicKey,
        vapidKeys.privateKey
    );

    try {
        const notifications = await db.notifications.findMany({
            where: {
                userId: user_id
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        const sendAll = notifications.map(async (notification) => {
            const payload = JSON.parse(notification.notification);
            return await webpush.sendNotification(
                payload,
                JSON.stringify({
                    title: name,
                    icon,
                    body: message,

                })
            );
        })

        await Promise.all(sendAll)
        return "{}"

    } catch (error) {
        return JSON.stringify({ error: (error as Error)?.message })
    }
}
