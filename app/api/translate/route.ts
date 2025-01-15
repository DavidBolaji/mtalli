
// import translate from 'translate'
// import { JSDOM } from 'jsdom';
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}


export async function POST(req: NextRequest) {
  const { html, targetLang } = await req.json();

  console.log('[HTML]', html)
  console.log('[LANG]', targetLang)
  
  // // Set the translation engine to 'libre'
  // translate.engine = 'libre';
  // translate.key = undefined;

  const fullHtml = `
  <html>
    <head>
      <title>Translation</title>
    </head>
    <body>${html}</body>
  </html>
`;
  
  // const dom = new JSDOM(fullHtml);
  // const document = dom.window.document;
  
  // Function to translate text nodes
  // async function translateTextNodes(node: Node): Promise<void> {
  //   console.log('[NODE]', node)
  //   if (node.nodeType === Node.TEXT_NODE) {
  //     const textNode = node as Text;
  //     const originalText = textNode.nodeValue?.trim();
  //     if (originalText) {
  //       try {
  //         // Log the translation request
  //         console.log(`[TRANSLATING] ${originalText}`);
  //         const translatedText = await translate(originalText, targetLang);
  //         console.log(`[TRANSLATED] ${translatedText}`);
  //         textNode.nodeValue = translatedText;
  //       } catch (error) {
  //         console.error('Error during translation:', error);
  //       }
  //     }
  //   } else if (node.childNodes) {
  //     for (const child of Array.from(node.childNodes)) {
  //       await translateTextNodes(child);
  //     }
  //   }
  // }
  
  try {
    // console.log('[BODY]', document.body)
    // Start translating the text nodes
    // await translateTextNodes(dom.serialize());
    // await translate(html, targetLang);
  
    return NextResponse.json({ translatedHtml: fullHtml });
  } catch (error) {
    console.log((error as Error)?.message)
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
