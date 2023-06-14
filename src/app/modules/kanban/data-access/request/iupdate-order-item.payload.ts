export interface IUpdateOrderItemPayload {
  id?:number;
  currentListId?: number;
  targetListId?: number;
  currentOrder: number;
  targetOrder: number;
}
