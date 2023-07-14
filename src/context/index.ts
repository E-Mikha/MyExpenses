import { createDomain } from "effector";
import { ICost } from "../types";

const costs = createDomain();

export const setCosts = costs.createEvent<ICost[]>();
export const createCosts = costs.createEvent<ICost>();
export const updateCosts = costs.createEvent<ICost>();
export const removeCosts = costs.createEvent<string | number>();

export const $costs = costs
  .createStore<ICost[]>([])
  .on(createCosts, (state, cost) => [...state, cost])
  .on(setCosts, (_, costs) => costs);

export const setTotalPrice = costs.createEvent<number>();

export const $totalPrice = costs
  .createStore<number>(0)
  .on(setTotalPrice, (_, value) => value);
