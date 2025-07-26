export interface Item {
  label: string;
  icon: string;
  submenu?: { label: string; icon: string }[];
}
