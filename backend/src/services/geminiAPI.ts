import { GoogleGenAI, Type } from '@google/genai';

/**
 * Gera uma receita com base nos ingredientes fornecidos.
 * @param ingredients Lista de ingredientes no formato [{ name, quantity, unit }]
 * @returns Receita gerada pela API do Gemini.
 */
export async function generateRecipe(
  ingredients: { name: string, quantity: number, unit: string }[],
  observations?: string
): Promise<any> {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const config = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        required: ["title", "description", "difficulty", "instructions", "prepTime", "servings", "whatIs", "ingredients"],
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          difficulty: { type: Type.STRING, enum: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] },
          instructions: { type: Type.STRING },
          prepTime: { type: Type.INTEGER },
          servings: { type: Type.INTEGER },
          whatIs: { type: Type.STRING },
          ingredients: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              required: ["name", "quantity", "unit"],
              properties: {
                name: { type: Type.STRING },
                quantity: { type: Type.NUMBER },
                unit: { type: Type.STRING },
              },
            },
          },
        },
      },
      systemInstruction: [
        {
        text: `Você vai gerar uma receita com base nos ingredientes que eu passar. Cada ingrediente possui nome, quantidade e unidade. Você pode adicionar até no máximo 3 ingredientes extras **apenas se absolutamente necessário** para coerência da receita. Sempre respeite todas as observações do usuário (como restrições alimentares ou preferências).Seja detalhado nas instruções. A dificuldade vai de 1 (pipoca) a 10 (alta gastronomia), com exemplos intermediários como 4 (lasanha) e 8 (sushi). o whatIs é a definição da receita em ingles, como "chocolate pancake", "tomato soup", "salad", "BBQ" etc.`,
        },
      ],
    };

    const formattedIngredients = ingredients.map(i => `${i.quantity} ${i.unit} de ${i.name}`).join(', ');
    const prompt = `Crie uma receita usando os seguintes ingredientes: ${formattedIngredients}.` +
                   (observations ? ` Observações do usuário: ${observations}` : "");

    const contents = [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ];

    const response = await ai.models.generateContentStream({
      model: 'gemini-2.0-flash',
      config,
      contents,
    });

    let result = '';
    for await (const chunk of response) {
      result += chunk.text;
    }

    return JSON.parse(result);
  } catch (error) {
    console.error('Erro ao gerar receita:', error);
    throw new Error('Não foi possível gerar a receita. Tente novamente mais tarde.');
  }
}