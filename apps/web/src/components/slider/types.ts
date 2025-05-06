export interface SliderProps {
  value: number;
  setValue: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}
