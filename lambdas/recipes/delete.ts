import { deleteRecipe } from "../../services/recipe-service";
import SuccessResponse from "../../types/lambda-responses/success-response";
import { decodeToken } from "../../utilities/auth-helpers";
import { withErrorBoundary } from "../../utilities/error-boundary";

module.exports.handler = async (event) => {
  return await withErrorBoundary(async () => {
    const userId = decodeToken(event.headers.authorization).userId;
    const recipeId = event.pathParameters.id;
    await deleteRecipe(recipeId, userId);
    return new SuccessResponse();
  });
};
