import { GoogleGenAI } from "@google/genai";
import { Tour } from "../data/tours";

const genAI = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || "" 
});

export interface Message {
  role: "user" | "model";
  text: string;
}

export const getConciergeResponse = async (
  messages: Message[], 
  tour: Tour
) => {
  try {
    const systemInstruction = `
      You are the BLINDTRIP Luxury Travel Concierge. A user is interested in booking the tour: "${tour.name}" in ${tour.location}, ${tour.country}.
      
      Details of the tour:
      - Price: ${tour.price.toLocaleString('vi-VN')} VNĐ
      - Duration: ${tour.duration}
      - Highlights: ${tour.features.join(', ')}
      - Description: ${tour.description}
      
      Your goal:
      1. Answer any questions the user has about this tour.
      2. Help them feel confident about the booking.
      3. Maintain a sophisticated, helpful, and exclusive tone (Dark Luxury aesthetic).
      4. If the user seems ready to book, encourage them to click the "Confirm Booking" button in the interface.
      5. Keep responses concise and focused on travel Planning.
      
      Responses should be in Vietnamese by default, as the app is in Vietnamese.
    `;

    const response = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      })),
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Xin lỗi, tôi đang gặp một chút gián đoạn kỹ thuật. Bạn có thể hỏi lại sau giây lát được không?";
  }
};
