export async function getPexelsImage(whatIs: string): Promise<string> {
    const apiKey = process.env.PEXELS_ACCESS_KEY!;
    const query = whatIs;
    const endpoint = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=1`;
  
    try {
      const response = await fetch(endpoint, {
        headers: {
          Authorization: apiKey,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
  
      const data = await response.json();
      if (data.photos && data.photos.length > 0) {
        return data.photos[0].src.original; // ou src.large, original, etc.
      } else {
        return ""; // fallback opcional
      }
    } catch (err: any) {
      console.error("Erro ao buscar imagem da receita:", err);
      return ""; // fallback em caso de erro
    }
  }
  