
import { supabase } from "@/integrations/supabase/client";
import { Answer, DimensionResult, QuizResult, UserData } from "@/types/quiz";
import { Json } from "@/integrations/supabase/types";
import { logger } from '@/lib/logger';

export interface SaveQuizResultParams {
  userData: UserData;
  quizResult: QuizResult;
  answers: Answer[];
}

export const saveQuizResult = async ({ userData, quizResult, answers }: SaveQuizResultParams) => {
  try {
    const { data, error } = await supabase
      .from("quiz_results")
      .insert({
        user_email: userData.email,
        firstname: userData.firstName,
        lastname: userData.lastName || "",
        total_score: quizResult.totalScore,
        dimension_scores: quizResult.dimensionScores as unknown as Json,
        answers: answers as unknown as Json,
      })
      .select();

    if (error) {
      logger.error("Error saving quiz results:", error);
      throw error;
    }

    return data;
  } catch (error) {
    logger.error("Error in saveQuizResult:", error);
    throw error;
  }
};

export const assignPromoCode = async (userEmail: string) => {
  try {
    const { data, error } = await supabase.functions.invoke("assign-promo-code", {
      body: { userEmail }
    });

    if (error) {
      logger.error("Error calling assign-promo-code function:", error);
      throw new Error("Failed to assign promo code");
    }

    return data.promoCode;
  } catch (error) {
    logger.error("Error assigning promo code:", error);
    throw error;
  }
};

export const sendQuizResultsEmail = async (userData: UserData, quizResult: QuizResult, promoCode: string) => {
  try {
    // Send both admin notification and client email
    const response = await supabase.functions.invoke('send-quiz-results', {
      body: JSON.stringify({
        firstName: userData.firstName,
        userEmail: userData.email,
        totalScore: quizResult.totalScore,
        dimensionScores: quizResult.dimensionScores,
        promoCode: promoCode,
        sendToClient: true // Enable sending to client
      })
    });

    if (response.error) {
      logger.error("Email sending failed:", response.error);
      return { success: false, error: "Erreur d'envoi d'email" };
    }

    return { success: true };
  } catch (error) {
    logger.error("Error sending quiz results email:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : String(error)
    };
  }
};
