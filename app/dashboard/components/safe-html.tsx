"use client"
import React, { useMemo } from 'react';
import DOMPurify from 'dompurify';

export default function SafeHTML({ content }: {content: string}) {
  const sanitizedContent = useMemo(() => ({
    __html: DOMPurify.sanitize(content)
  }), [content]);

  return <div className='font-onest text-sm leading-6' dangerouslySetInnerHTML={sanitizedContent} />;
}