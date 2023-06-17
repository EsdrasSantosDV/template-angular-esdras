import { Item } from './item';

export interface List {
  id: number;
  titleList: string;
  order: number;
  items: Item[];
}
