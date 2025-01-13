"use client"
import { useAxios } from './use-axios';


const usePwa = () => {
    const Axios = useAxios();
    
    const urlBase64ToUint8Array = (base64String: string) => {
      const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);
  
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    };
  
    const subscribeToPush = async () => {
      // ✅ Ask for Notification permission first
      const permission = await Notification.requestPermission();
  
      if (permission !== 'granted') {
        console.warn('Permission for notifications was denied');
        return;
      }
  
      try {
        const registration = await navigator.serviceWorker.ready;
        console.log('[REGISTRATION]', registration);
  
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_KEY!),
        });
  
        console.log('[SUBSCRIPTION]', subscription);
  
        const serializedSub = JSON.parse(JSON.stringify(subscription));
        await Axios.post('/notification', { subscription: serializedSub });
  
      } catch (error) {
        console.error('Error during subscription:', error);
      }
    };
  
    const showNotification = () => {
      subscribeToPush();
    };
  
    return { showNotification };
  };
  
  export default usePwa;
  