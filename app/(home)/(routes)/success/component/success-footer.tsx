"use client"
import { useLanguage } from '@/hooks/use-language'
import React from 'react'
import { FormattedMessage } from 'react-intl'

// Translated text for different languages
const localizedText = {
  en: [
    {
      title: "Prepare for Your Trip:",
      text: "Check your email for booking details, itinerary, and any special instructions."
    },
    {
      title: "Stay Updated:",
      text: "We'll send reminders and any important updates as your experience date approaches."
    },
    {
      title: "Need Assistance?:",
      text: "Our support team is here for you! Feel free to reach out if you have any questions."
    }
  ],
  fr: [
    {
      title: "Préparez votre voyage :",
      text: "Vérifiez votre e-mail pour les détails de la réservation, l'itinéraire et les instructions spéciales."
    },
    {
      title: "Restez informé :",
      text: "Nous vous enverrons des rappels et des mises à jour importantes à mesure que la date de votre expérience approche."
    },
    {
      title: "Besoin d'aide ? :",
      text: "Notre équipe d'assistance est là pour vous ! N'hésitez pas à nous contacter si vous avez des questions."
    }
  ]
}

const SuccessFooter = () => {
  const { language } = useLanguage()

  // Get the text based on the current language
  const nextText = localizedText[language as 'fr' | 'en'] || localizedText.en

  return (
    <>
      <p className="font-onest text-base black-100 leading-8 py-[26px] border-b border-orange-300">
        <FormattedMessage id="confirmText" />
      </p>

      <h6 className="font-onest font-bold text-xl black-100 py-[26px]">
        <FormattedMessage id="next" />
      </h6>

      <ul className="border-b border-orange-300 font-normal pb-[26px]">
        {nextText.map((el, index) => (
          <li key={index}>
            <span className="font-bold font-onest text-base mr-2">{el.title}</span>
            {el.text}
          </li>
        ))}
      </ul>

      <span className="pt-[26px] font-onest font-medium text-base inline-block">
        <FormattedMessage id="thanks" />
      </span>
    </>
  )
}

export default SuccessFooter
