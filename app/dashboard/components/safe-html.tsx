"use client"
import React, { useEffect, useMemo, useState } from 'react';
import DOMPurify from 'dompurify';
// import { useLanguage } from '@/hooks/use-language';
// import { useAxios } from '@/hooks/use-axios';

export default function SafeHTML({ content }: { content: string }) {
  const [c, setC] = useState(content)
  // const { language } = useLanguage()
  // const { post } = useAxios()

  useEffect(() => {
    const fetch = async () => {
      // const res = await post('/translate', { html: content, targetLang: language })
      // setC(res.data.translatedHtml)
      setC(content)
    }
    fetch()
  }, [content])
  const sanitizedContent = useMemo(() => ({
    __html: DOMPurify.sanitize(c)
  }), [c]);

  return <div className='font-onest text-sm leading-6' dangerouslySetInnerHTML={sanitizedContent} />;
}