
import { GoogleGenAI, Type, Modality, GenerateContentResponse } from "@google/genai";

// Create a new GoogleGenAI instance right before making an API call to ensure it uses the most up-to-date API key.
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

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
 * Edit an image using Gemini 2.5 Flash Image model.
 * Supports text-to-image editing (e.g., "Add a retro filter").
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
    if (e.message?.includes("Requested entity was not found.")) {
      await (window as any).aistudio?.openSelectKey();
    }
    throw e;
  }
  return null;
}

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
    
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (e: any) {
    if (e.message?.includes("Requested entity was not found.")) {
      await (window as any).aistudio?.openSelectKey();
    }
    throw e;
  }
}

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

export function decode(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

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

export function encode(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
