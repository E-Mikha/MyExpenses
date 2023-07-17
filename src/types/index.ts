export interface IAlert {
  alertText: string;
  alertStatus: string;
}

export interface IAlertProps {
  props: IAlert;
}

export interface ISpinnerProps {
  top: number;
  left: number;
}

export interface ICostsHeaderProps {
  costs: ICost[];
}

export interface ICost {
  text: string;
  price: number;
  date: Date | string;
  _id?: number | string;
}

export interface IBaseEffectArgs {
  url: string;
  token: string;
}

export interface ICreateCost extends IBaseEffectArgs {
  cost: ICost;
}

export interface IRefreshToken extends IBaseEffectArgs {
  username: string;
}
