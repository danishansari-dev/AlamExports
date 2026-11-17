
import { GoogleGenAI, Type, Modality, GenerateContentResponse } from "@google/genai";

/**
 * Resolves the active Gemini API key across multiple environment conventions
 * @danishansari-dev - Author tag
 * @returns The resolved Gemini API key string or empty string
 */
export function getApiKey(): string {
  // Why: Vite uses import.meta.env, while Node/AI Studio uses process.env.
  // Checking both ensures the app never crashes due to missing runtime objects in browsers.
  const viteKey = typeof import.meta !== 'undefined' && import.meta.env
    ? (import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_API_KEY)
    : undefined;

  const processKey = typeof process !== 'undefined' && process.env
    ? (process.env.API_KEY || process.env.GEMINI_API_KEY)
    : undefined;

  return (viteKey || processKey || '') as string;
}

/**
 * Instantiates the GoogleGenAI client with the latest available credential
 * @danishansari-dev - Author tag
 * @returns GoogleGenAI instance
 */
const getAI = (): GoogleGenAI => {
  const apiKey = getApiKey();
  // Why: Early warning in browser console helps developers quickly detect when Vercel environment variables are missing
  if (!apiKey) {
    console.warn("AlamExports: Gemini API key is missing. Ensure VITE_GEMINI_API_KEY is configured in your Vercel project.");
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Sends a text prompt to Gemini 3 Pro for B2B export consultancy answers
 * @danishansari-dev prompt - The user prompt string
 * @danishansari-dev thinking - Whether to enable extended reasoning budget
 * @returns Generated markdown or text response
 */
export async function askGeminiPro(prompt: string, thinking: boolean = false) {
  const ai = getAI();
  const config = thinking ? { thinkingConfig: { thinkingBudget: 32768 } } : {};
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config
  });
  return response.text;
}

/**
 * Edits an existing rug image using natural language prompts
 * @danishansari-dev imageBase64 - Base64 encoded source image
 * @danishansari-dev prompt - Edit instructions such as color or filter changes
 * @returns Base64 encoded edited image or null
 */
export async function editImage(imageBase64: string, prompt: string) {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: imageBase64,
              mimeType: 'image/png',
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (e: any) {
    // Tricky logic: When embedded inside Google AI Studio, handle interactive key selection if token expired
    if (e.message?.includes("Requested entity was not found.")) {
      await (window as any).aistudio?.openSelectKey();
    }
    throw e;
  }
  return null;
}

/**
 * Generates custom rug mockups from text descriptions
 * @danishansari-dev prompt - Text description of desired rug style and motif
 * @danishansari-dev aspectRatio - Desired image aspect ratio (e.g. 1:1, 16:9)
 * @danishansari-dev size - Render resolution size (e.g. 1K)
 * @returns Base64 image URL data string or null
 */
export async function generateProductImage(prompt: string, aspectRatio: string = "1:1", size: string = "1K") {
  const ai = getAI();
  
  const hasKey = await (window as any).aistudio?.hasSelectedApiKey();
  if (!hasKey) {
    await (window as any).aistudio?.openSelectKey();
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: { parts: [{ text: `A professional high-end rug design: ${prompt}` }] },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio as any,
          imageSize: size as any
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (e: any) {
    if (e.message?.includes("Requested entity was not found.")) {
      await (window as any).aistudio?.openSelectKey();
    }
    throw e;
  }
  return null;
}

/**
 * Generates video animations for lifestyle rug mockups using Veo
 * @danishansari-dev prompt - Scene and camera motion description
 * @danishansari-dev startImageBase64 - Optional initial image frame
 * @returns Object URL pointing to the downloaded video blob
 */
export async function generateVeoVideo(prompt: string, startImageBase64?: string) {
  const ai = getAI();
  
  const hasKey = await (window as any).aistudio?.hasSelectedApiKey();
  if (!hasKey) {
    await (window as any).aistudio?.openSelectKey();
  }

  const payload: any = {
    model: 'veo-3.1-fast-generate-preview',
    prompt: `Cinematic lifestyle video featuring: ${prompt}`,
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: '16:9'
    }
  };

  if (startImageBase64) {
    payload.image = {
      imageBytes: startImageBase64,
      mimeType: 'image/png'
    };
  }

  try {
    let operation = await ai.models.generateVideos(payload);
    
    // Why: Veo video synthesis is asynchronous; poll until video processing completes
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    const apiKey = getApiKey();
    const response = await fetch(`${downloadLink}&key=${apiKey}`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (e: any) {
    if (e.message?.includes("Requested entity was not found.")) {
      await (window as any).aistudio?.openSelectKey();
    }
    throw e;
  }
}

/**
 * Conducts multi-modal visual inspection of rug designs using Gemini Vision
 * @danishansari-dev imageBase64 - Base64 encoded rug image
 * @danishansari-dev prompt - Analytical inspection instructions
 * @returns Technical assessment text
 */
export async function analyzeImage(imageBase64: string, prompt: string) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        { inlineData: { data: imageBase64, mimeType: 'image/png' } },
        { text: prompt }
      ]
    }
  });
  return response.text;
}

/**
 * Fetches real-time market search grounding trends for rug export buyers
 * @danishansari-dev query - Search query keyword
 * @returns Object containing response text and cited web sources
 */
export async function searchTrends(query: string) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `What are the current B2B global trends for: ${query}`,
    config: {
      tools: [{ googleSearch: {} }]
    }
  });
  const urls = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  return { text: response.text, sources: urls };
}

/**
 * Decodes base64 string into binary byte array
 * @danishansari-dev base64 - Base64 encoded string
 * @returns Uint8Array binary representation
 */
export function decode(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Converts raw PCM audio buffer into playable Web Audio API AudioBuffer
 * @danishansari-dev data - Uint8Array raw PCM bytes
 * @danishansari-dev ctx - Active AudioContext
 * @danishansari-dev sampleRate - Target sample rate
 * @danishansari-dev numChannels - Number of audio channels
 * @returns AudioBuffer ready for playback
 */
export async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

/**
 * Encodes binary byte array into base64 string
 * @danishansari-dev bytes - Uint8Array binary byte array
 * @returns Base64 representation string
 */
export function encode(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
