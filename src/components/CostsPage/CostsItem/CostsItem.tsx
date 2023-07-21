import { useState } from "react";
import { ICostsItemProps } from "../../../types";
import { getAuthDataFromLS, handleAlertMessage } from "../../../utils/auth";
import { deleteCostFx } from "../../../api/costsClient";
import { removeCosts } from "../../../context";
import { Spinner } from "../../Spinner/Spinner";
import { formateDate } from "../../../utils/arrayUtils";
import "./styles.css";

export const CostsItem = ({ cost, index }: ICostsItemProps) => {
  const [edit, setEdit] = useState(false);
  const [deleteSpinner, setDeleteSpinner] = useState(false);
  const [editSpinner, setEditSpinner] = useState(false);
  const [newText, setNewText] = useState(cost.text);
  const [newPrice, setNewPrice] = useState(cost.price);
  const [newDate, setNewDate] = useState(cost.date);

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewText(event.target.value);

  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewPrice(+event.target.value);

  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewDate(event.target.value);

  const allowEditCost = () => setEdit(true);

  const cancelEditCost = () => {
    setEditSpinner(false);
    setEdit(false);
  };

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

        {edit ? (
          <input
            onChange={handleChangeText}
            value={newText}
            type="text"
            className="form-control cost-item__shop-input"
          />
        ) : (
          <span> "{cost.text}"</span>
        )}

        {edit ? (
          <input
            onChange={handleChangeDate}
            value={new Date(newDate).toISOString().split("T")[0]}
            type="date"
            className="form-control cost-item__date-input"
          />
        ) : (
          <span className="cost-date">
            Date {formateDate(cost.date as string)}
          </span>
        )}
      </div>
      <div className="cost-item-right d-flex align-items-center">
        {edit ? (
          <input
            onChange={handleChangePrice}
            value={newPrice}
            type="text"
            className="form-control cost-item__price-input"
          />
        ) : (
          <span style={{ marginRight: "10px" }}>Cost {cost.price}</span>
        )}

        {edit ? (
          <div className="btn-block__inner">
            <button className="btn btn-success btn-save">
              {editSpinner ? <Spinner top={5} left={38} /> : "Save"}
            </button>
            <button
              className="btn btn-danger btn-cancel"
              onClick={cancelEditCost}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button className="btn btn-primary btn-edit" onClick={allowEditCost}>
            Edit
          </button>
        )}

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
