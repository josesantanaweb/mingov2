import { Button } from '@mingo/components';
import { SlideEnum } from '@/types/common';

interface SlideOptionProps {
  type: SlideEnum;
  multiplier: number;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const colorMap: Record<SlideEnum, string> = {
  [SlideEnum.BLACK]: 'bg-base-700',
  [SlideEnum.RED]: 'bg-red-500',
  [SlideEnum.VIOLET]: 'bg-primary-600',
};

const SlideOption = ({
  type,
  multiplier,
  selected,
  disabled,
  onClick,
}: SlideOptionProps) => (
  <Button
    variant={selected ? 'primary' : 'default'}
    disabled={disabled}
    onClick={onClick}
    isFull
  >
    <span
      className={`w-4 h-4 rounded-full border border-white ${colorMap[type]}`}
    />
    X{multiplier}
  </Button>
);

export default SlideOption;
