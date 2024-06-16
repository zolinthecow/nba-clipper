import 'dotenv/config';

import { expect, test } from 'vitest';
import AIService from '../AIService';

test('Test if gemini model name still works', async () => {
  const aiService = new AIService();
  const geminiModel = aiService.getGeminiModel();
  const testChat = geminiModel.startChat({
    generationConfig: {
      maxOutputTokens: 4,
    },
  });
  const testResult = await testChat.sendMessage('test');
  const resp = testResult.response;
  const test = resp.text();
  expect(test.length > 0).toBe(true);
});
