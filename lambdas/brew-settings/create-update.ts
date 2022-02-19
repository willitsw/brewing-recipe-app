import SuccessResponse from "../../types/lambda-responses/success-response";
import UnauthorizedResponse from "../../types/lambda-responses/unauthorized-responxe";
import { decodeToken } from "../../utilities/auth-helpers";
import { withErrorBoundary } from "../../utilities/error-boundary";
import { BrewSettings } from "../../types/brew-settings";
import { putBrewSetting } from "../../services/brew-settings-service";

module.exports.handler = async (event) => {
  return await withErrorBoundary(async () => {
    const userId = decodeToken(event.headers.authorization).userId;
    const updatedBrewSettings: BrewSettings = JSON.parse(event.body);
    if (updatedBrewSettings.userId !== userId) {
      return new UnauthorizedResponse();
    }
    await putBrewSetting(updatedBrewSettings);
    return new SuccessResponse(updatedBrewSettings);
  });
};