'use client';
import React, { useState } from 'react';

import type { SliderProps } from './types';

const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  setValue,
}): React.ReactElement => {
  const [isDragging, setIsDragging] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue((Number(e.target.value) / max) * 100);
    setIsDragging(true);
  };

  const handleMouseUp = (): void => setIsDragging(false);

  const handleTouchEnd = (): void => setIsDragging(false);

  const generateLabels = (): number[] => {
    const labels = [];
    for (let i = min; i <= max; i += (max - min) / 4) {
      labels.push(i);
    }
    return labels;
  };

  return (
    <div className="relative w-full p-3 bg-[#303f54] rounded-full">
      <div className="relative w-full p-1 bg-base-700 rounded-full">
        <div className="relative h-2.5 w-full rounded-full bg-red-500">
          <div
            className="absolute h-full rounded-full bg-green-500"
            style={{
              left: '0%',
              right: `${100 - value}%`,
            }}
          />
          <span className="absolute w-2 h-full bg-white bg-opacity-70 top-0 left-1/2" />
          <div
            className="block -top-3 rounded-lg transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 absolute cursor-pointer w-8 h-9 -translate-x-1/2 bg-cover shadow-[0_0_4px_0_rgba(0,0,0,0.3)]"
            style={{
              left: `calc(${value}% - 4px)`,
              backgroundImage:
                'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABICAYAAABGOvOzAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJJSURBVHgB7ZxBTsJQEIb/FkmADbhjReqKpXIC9QZ6E2+gN1BPoN5ATwCeQLwANmHDDhISQkLgOUNblFIKadDAm/mSH8jQt5if9x5tMvMcbIkxpkJvV6Rz0hnJI1WwHwxIPqlNapHeHMcZYBdQ4h7pgdQ3h8UTyUNWaHCFdG8On/u0PJ01yXv01kQwzW3AJ13SsvDjX7jxACXP69um5BmP1AxzW2JpBlj4y8fxEZsJCwNMsMt/wN7kI3xSI/qX+L0EbmF/8oyHINc58xkQTv0vyOKEl0I0A+4gjxt+ccK134c8eA844RlwBZnMb+3ZgAvI5ZwNOIVczngP4PW/L091/82ADTAQzBEyMplMEuP5fD513Gw2w3Q6XYnncjm4rvtnY9eR2YBOp5MYr9frqePG4zG63e5KvFgsolarpY4dDofo9Xor8XK5jGq1iixks80i1AAIRw2AcNQACEcNgHDUAAhHDYBw1AAIRw2AcNQACEcNgHDUAAhHDYBw1AAIRw2AcNQACEcNgHDUAAhHDYBwMtcJjkajxHipVEodx6VuXCkWh8vcCoVC6lguzUsqz+PSvE3leesQXyjJS2A3DYaHyYAN8CGXecfIJ+TSZgNakEsrapnhhimJJfPHbtg/9wJ5PHPu2jbHn8JW0kfI4TFqn9XW2SgaBi5h932Bj6B5enHzt/QwFE6La9hpgk+6jp8hoAcoJF0dXtiAHRsj59BISn4rTHCIyrM5LPjAFz74xduUn4MtMT/H6Fwg6Db1sJ/H6LyTXrc9RucbdFjonenZgYsAAAAASUVORK5CYII=")',
            }}
          >
            {isDragging && (
              <span className="bg-[#303f54] text-white text-sm w-9 h-8 rounded-lg absolute -top-14 flex items-center justify-center">
                {value.toFixed(0)}
              </span>
            )}
          </div>
          <input
            id="slider"
            type="range"
            min={min}
            max={max}
            step={step}
            className="absolute inset-0 opacity-0 w-full cursor-pointer"
            value={value}
            onChange={handleInputChange}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleTouchEnd}
          />
        </div>
      </div>
      <label
        className="flex items-center text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-40 text-secondary data-[invalid]:text-secondary relative w-full translate-y-10 font-normal"
        htmlFor="slider"
      >
        {generateLabels().map((label) => (
          <span
            key={label}
            className="absolute -translate-x-1/2 text-secondary text-lg"
            style={{ left: `calc(${(label / max) * 100}%)` }}
          >
            {label}
          </span>
        ))}
      </label>
    </div>
  );
};

Slider.displayName = 'Slider';

export default Slider;
