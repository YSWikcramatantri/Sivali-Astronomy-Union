import type { Question } from "../types";

export const generateQuizQuestions = async (topic: string, count: number): Promise<Question[]> => {
  try {
    const response = await fetch('/.netlify/functions/generate-quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic, count }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      // Use the error message from the serverless function's response
      throw new Error(responseData.error || `Server returned status: ${response.status}`);
    }

    return responseData as Question[];
  } catch (error) {
    console.error("Error calling generate-quiz function:", error);
    // Re-throw the error so it can be caught by the calling component (e.g., AdminPage)
    if (error instanceof Error) {
        throw new Error(`Failed to generate quiz questions: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the server.");
  }
};
