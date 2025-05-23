import { GoogleGenAI, Type } from "@google/genai";

/**
 * Gera uma receita com base nos ingredientes fornecidos.
 * @param ingredients Lista de ingredientes no formato [{ name, quantity, unit }]
 * @returns Receita gerada pela API do Gemini.
 */
export async function generateRecipe(
  ingredients: { name: string; quantity: number; unit: string }[],
  observations?: string
): Promise<any> {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const config = {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        required: [
          "title",
          "description",
          "difficulty",
          "instructions",
          "prepTime",
          "servings",
          "whatIs",
          "ingredients",
        ],
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          difficulty: {
            type: Type.STRING,
            enum: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          },
          instructions: { type: Type.STRING },
          prepTime: { type: Type.INTEGER },
          servings: { type: Type.INTEGER },
          whatIs: { type: Type.STRING },
          isPossibleToMake: { type: Type.BOOLEAN },
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
          text: `Você deve gerar uma receita com base nos ingredientes fornecidos. Caso nenhum ingrediente seja passado, crie a receita com base apenas nas observações do usuário.

Formato dos ingredientes:
- nome: sempre no singular e genérico (ex: "alho", não "alho picado")
- quantidade: um valor numérico (use 0 quando a medida for "a gosto")
- unidade: como "g", "ml", "colher", ou "a gosto", quando aplicável

Importante:
- Não adicione ingredientes extras, exceto se isso for explicitamente indicado nas observações do usuário.
- Caso o ingrediente venha vazio (sem nome), exclua-o da receita.
- Não crie variações opcionais dentro do mesmo ingrediente. Exemplo incorreto: "Queijo (muçarela, parmesão ou outro de sua preferência)" — mantenha apenas o ingrediente informado.
- Sempre respeite todas as observações do usuário, como restrições alimentares, preferências ou limitações.
- As instruções devem ser claras, diretas e detalhadas passo a passo. Inclua modos de preparo como “picar”, “refogar”, “assar”, conforme necessário.

Dificuldade:
Varia de 1 a 10, sendo:
1: muito simples (ex: pipoca)
4: média (ex: lasanha)
8: avançada (ex: sushi)
10: alta gastronomia ou técnica elaborada

whatIs:
Use o campo whatIs para gerar uma frase curta em inglês que represente a receita de forma específica e descritiva.
Evite termos genéricos como apenas "fish" ou "chicken". Use expressões mais precisas como:
- "grilled fish"
- "fried chicken"
- "lime-flavored water"
- "BBQ ribs"
- "strawberry gelatin"
- "oven-baked potatoes"
Essa frase será usada para buscar uma imagem correspondente à receita, então priorize a clareza visual.

isPossibleToMake:
Este é um valor booleano que indica se a receita pode ser preparada nas condições normais, com base nos ingredientes fornecidos e nas observações do usuário.
Deve ser false quando:
- A receita exige ingredientes impróprios, ofensivos ou inviáveis
- Há conflito com restrições alimentares declaradas
- A combinação de ingredientes torna a receita inconsumível ou incoerente

O objetivo é evitar gerar receitas que sejam impossíveis ou inapropriadas para o consumo realista.`,
        },
      ],
    };

    const formattedIngredients = ingredients
      .map((i) => `${i.quantity} ${i.unit} de ${i.name}`)
      .join(", ");
    const prompt =
      `Crie uma receita usando os seguintes ingredientes: ${formattedIngredients}.` +
      (observations ? ` Observações do usuário: ${observations}` : "");

    const contents = [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ];

    const response = await ai.models.generateContentStream({
      model: "gemini-2.5-flash-preview-04-17",
      config,
      contents,
    });

    let result = "";
    for await (const chunk of response) {
      result += chunk.text;
    }

    return JSON.parse(result);
  } catch (error) {
    console.error("Erro ao gerar receita:", error);
    throw new Error(
      "Não foi possível gerar a receita. Tente novamente mais tarde."
    );
  }
}

/**
 * Valida se os ingredientes, descrição e instrução são apropriados usando IA.
 * Retorna { isValid: boolean, reason?: string }
 */
export async function validateWithAI(
  ingredients: { name: string; quantity: number; unit: string }[],
  description?: string,
  instructions?: string
): Promise<{ isValid: boolean; reason?: string }> {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const config = {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        required: ["isValid"],
        properties: {
          isValid: { type: Type.BOOLEAN },
          reason: { type: Type.STRING },
        },
      },
      systemInstruction: [
        {
          text: `Você deve analisar a lista de ingredientes recebida, a descrição da receita e as instruções e responder se todos são apropriados, não são ofensivos, impróprios, perigosos ou inviáveis para uma receita realista. Se algum ingrediente, a descrição ou as instruções forem inadequados, retorne isValid: false e explique o motivo em "reason" em portugues. Caso contrário, retorne isValid: true.`,
        },
      ],
    };

    const formattedIngredients = ingredients
      .map((i) => `${i.quantity} ${i.unit} de ${i.name}`)
      .join(", ");
    let prompt = `Valide os seguintes ingredientes: ${formattedIngredients}.`;
    if (description) prompt += ` Descrição da receita: ${description}.`;
    if (instructions) prompt += ` Instruções: ${instructions}.`;

    const contents = [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ];

    const response = await ai.models.generateContentStream({
      model: "gemini-2.0-flash",
      config,
      contents,
    });

    let result = "";
    for await (const chunk of response) {
      result += chunk.text;
    }

    return JSON.parse(result);
  } catch (error) {
    console.error("Erro ao validar ingredientes:", error);
    return {
      isValid: false,
      reason:
        "Erro ao tentar validar ingredientes, descrição e instruções com IA.",
    };
  }
}
