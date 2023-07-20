import { createDomain } from "effector";
import { ICost } from "../types";

const costs = createDomain();

export const setCosts = costs.createEvent<ICost[]>();
export const createCosts = costs.createEvent<ICost>();
export const updateCosts = costs.createEvent<ICost>();
export const removeCosts = costs.createEvent<string | number>();
export const setTotalPrice = costs.createEvent<number>();

const handleRemoveCost = (costs: ICost[], id: string | number) =>
  costs.filter((cost) => cost._id !== id);

export const $costs = costs
  .createStore<ICost[]>([])
  .on(createCosts, (state, cost) => [...state, cost])
  .on(setCosts, (_, costs) => costs)
  .on(removeCosts, (state, id) => [...handleRemoveCost(state, id)]);

export const $totalPrice = costs
  .createStore<number>(0)
  .on(setTotalPrice, (_, value) => value);
