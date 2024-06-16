import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import IAIService from './AIService.interface';

export default class AIService implements IAIService {
  private _geminiClient: GoogleGenerativeAI;
  private _geminiModel: GenerativeModel;

  constructor() {
    this._geminiClient = new GoogleGenerativeAI(
      process.env['GEMINI_API_KEY'] || '',
    );
    this._geminiModel = new GenerativeModel(
      process.env['GEMINI_API_KEY'] || '',
      {
        model: 'gemini-1.5-pro-latest',
      },
      {
        apiVersion: 'v1beta',
      },
    );
  }

  public getGeminiClient(): GoogleGenerativeAI {
    return this._geminiClient;
  }

  public getGeminiModel(): GenerativeModel {
    return this._geminiModel;
  }
}
