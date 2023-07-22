import { createDomain } from "effector";
import { ICost } from "../types";

const costs = createDomain();

export const setCosts = costs.createEvent<ICost[]>();
export const createCosts = costs.createEvent<ICost>();
export const updatedCost = costs.createEvent<ICost>();
export const removeCosts = costs.createEvent<string | number>();
export const setTotalPrice = costs.createEvent<number>();

const handleRemoveCost = (costs: ICost[], id: string | number) =>
  costs.filter((cost) => cost._id !== id);

const handleUpdateCost = (
  costs: ICost[],
  id: string | number,
  payload: Partial<ICost>
) =>
  costs.map((cost) => {
    if (cost._id === id) {
      return {
        ...cost,
        ...payload,
      };
    }

    return cost;
  });

export const $costs = costs
  .createStore<ICost[]>([])
  .on(createCosts, (state, cost) => [...state, cost])
  .on(setCosts, (_, costs) => costs)
  .on(removeCosts, (state, id) => [...handleRemoveCost(state, id)])
  .on(updatedCost, (state, cost) => [
    ...handleUpdateCost(state, cost._id as string, {
      text: cost.text,
      price: cost.price,
      date: cost.date,
    }),
  ]);

export const $totalPrice = costs
  .createStore<number>(0)
  .on(setTotalPrice, (_, value) => value);
