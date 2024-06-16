import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';

export default interface IAIService {
  getGeminiClient(): GoogleGenerativeAI;
  getGeminiModel(): GenerativeModel;
}
