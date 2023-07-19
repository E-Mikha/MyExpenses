import { AxiosError } from "axios";
import { IHandleAxiosErrorPayload } from "../types";
import { getAuthDataFromLS, handleAlertMessage, removeUser } from "./auth";
import { getCostsFx, refreshTokenFx } from "../api/costsClient";
import { setCosts } from "../context";

export const handleAxiosError = async (
  error: unknown,
  payload: IHandleAxiosErrorPayload | null = null
) => {
  const errorMessage =
    ((error as AxiosError).response?.data as { message: string }).message ||
    ((error as AxiosError).response?.data as { error: string }).error;

  if (errorMessage) {
    if (errorMessage === "jwt expired") {
      const payloadData = payload as IHandleAxiosErrorPayload;
      const authData = getAuthDataFromLS();

      refreshTokenFx({
        url: "/auth/refresh",
        token: authData.refresh_token,
        username: authData.username,
      });
      if (payload !== null) {
        switch (payloadData.type) {
          case "get":
            const costs = await getCostsFx({
              url: "/cost",
              token: authData.access_token,
            });

            setCosts(costs);
            break;

          default:
            break;
        }
      }
    } else {
      handleAlertMessage({
        alertText: errorMessage as string,
        alertStatus: "warning",
      });
      removeUser();
    }
  } else {
    handleAlertMessage({
      alertText: errorMessage as string,
      alertStatus: "warning",
    });
  }
};
