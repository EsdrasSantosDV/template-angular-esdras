export enum AlertType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
}

export type AlertData = {
  message: string;
  type: AlertType;
};
