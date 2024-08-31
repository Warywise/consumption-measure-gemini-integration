import gemAI from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import fs from 'fs';
import 'dotenv/config';

class GeminiService {
  protected genAImodel: gemAI.GenerativeModel;
  protected fileManagerAi: GoogleAIFileManager;

  constructor() {
    const genAI = new gemAI.GoogleGenerativeAI(
      process.env.GEMINI_API_KEY || '',
    );
    this.genAImodel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    this.fileManagerAi = new GoogleAIFileManager(
      process.env.GEMINI_API_KEY || '',
    );
  }

  async processImage(imageData: string) {
    const prompt = 'Identify the value of the measure';
    const fileName = `${Date.now()}-image.jpeg`;
    const imgBuffer = Buffer.from(imageData, 'base64');
    fs.writeFileSync(fileName, imgBuffer);

    const { file } = await this.fileManagerAi.uploadFile(fileName, {
      mimeType: 'image/jpeg',
      displayName: fileName,
    });

    const image = {
      inlineData: {
        data: Buffer.from(fs.readFileSync(fileName)).toString('base64'),
        mimeType: 'image/jpeg',
      },
    };

    const { response } = await this.genAImodel.generateContent([prompt, image]);

    let measure_value = Number(response.text().replace(/\D/g, ''));

    if (!measure_value || isNaN(measure_value)) {
      measure_value = 0;
    }

    // delete file after processing
    fs.unlinkSync(fileName);

    return { measure_value, image_url: file.uri };
  }

  async testAIModel(prompt: string) {
    const { response } = await this.genAImodel.generateContent([prompt]);
    return response.text();
  }
}

export default new GeminiService();
