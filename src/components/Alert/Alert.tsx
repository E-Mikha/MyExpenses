import { IAlertProps } from "../../types";
import "./style.css";

export const Alert = ({ props }: IAlertProps) => (
  <div className={`alert alert-wrapper alert-${props.alertStatus}`}>
    {props.alertText}
  </div>
);
