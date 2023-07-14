import { createEffect } from "effector";
import { ICreateCost } from "../types";
import api from "./axiosClient";

export const createCostFx = createEffect(
  async ({ url, cost, token }: ICreateCost) => {
    try {
      const { data } = await api.post(
        url,
        { ...cost },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
