import { useEffect, useState } from "react";
import { useStore } from "effector-react";
import { Spinner } from "../../Spinner/Spinner";
import { ICostsHeaderProps } from "../../../types";
import { countTotalPrice } from "../../../utils/arrayUtils";
import { $totalPrice } from "../../../context";
import "./style.css";

export const Header = ({ costs }: ICostsHeaderProps) => {
  const [spinner, setSpinner] = useState(false);
  const totalPrice = useStore($totalPrice);

  useEffect(() => {
    countTotalPrice(costs);
  }, [costs]);

  return (
    <div className="costs-header">
      <form className="d-flex mb-3">
        <div className="form-item">
          <span className="mb-3">Where was it spent</span>
          <input type="text" className="form-control" />
        </div>

        <div className="form-item">
          <span className="mb-3">How much was spent</span>
          <input type="text" className="form-control" />
        </div>

        <div className="form-item">
          <span className="mb-3">When was it spent</span>
          <input type="text" className="form-control" />
        </div>

        <button className="btn btn-primary add-btn">
          {spinner ? <Spinner top={5} left={20} /> : "Add"}
        </button>
      </form>
      <div style={{ textAlign: "end", marginBottom: 10 }}>
        Total:
        <span>
          {" "}
          {isNaN(parseInt(String(totalPrice)))
            ? 0
            : parseInt(String(totalPrice))}
        </span>
        baht
      </div>
    </div>
  );
};
