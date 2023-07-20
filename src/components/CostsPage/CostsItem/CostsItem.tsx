import { useState } from "react";
import { ICostsItemProps } from "../../../types";
import { getAuthDataFromLS, handleAlertMessage } from "../../../utils/auth";
import { deleteCostFx } from "../../../api/costsClient";
import { removeCosts } from "../../../context";
import { Spinner } from "../../Spinner/Spinner";

export const CostsItem = ({ cost, index }: ICostsItemProps) => {
  const [deleteSpinner, setDeleteSpinner] = useState(false);

  const deleteCost = async () => {
    setDeleteSpinner(true);

    const authData = getAuthDataFromLS();

    await deleteCostFx({
      url: "/cost",
      token: authData.access_token,
      id: cost._id as string,
    });

    setDeleteSpinner(false);
    removeCosts(cost._id as string);
    handleAlertMessage({
      alertText: "Successfully removed",
      alertStatus: "success",
    });
  };

  return (
    <li
      className="cost-item list-group-item d-flex justify-content-between align-items-center"
      id={cost._id as string}
    >
      <div className="cost-item-left">
        <span>{index} Shop</span>
        <span> "{cost.text}"</span>
        <span className="cost-date">Date {cost.date as string}</span>
      </div>
      <div className="cost-item-right d-flex align-items-center">
        <span className="cost-date">Cost {cost.price}</span>
        <button className="btn btn-primary btn-edit">Edit</button>
        <button className="btn btn-danger btn-delete" onClick={deleteCost}>
          <span>
            {deleteSpinner ? (
              <Spinner top={5} left={7} />
            ) : (
              <span>&times;</span>
            )}
          </span>
        </button>
      </div>
    </li>
  );
};
