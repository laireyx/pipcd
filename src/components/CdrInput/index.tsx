import { useCallback } from 'react';
import {
  numberInputValue,
  numberInputBox,
  numberInputLabel,
} from './index.css';

interface NumberInputProps {
  id: string;
  label: string;

  value: number;
  onChange: (value: number) => void;
}

export default function CdrInput({
  id,
  label,
  value,
  onChange,
}: NumberInputProps) {
  const handleChange = useCallback(
    ({ target }: { target: HTMLInputElement }) => {
      const newValue = parseInt(target.value) || 0;
      if (0 <= newValue && newValue < 100) onChange(newValue);
    },
    [onChange],
  );

  return (
    <div className={numberInputBox}>
      <label htmlFor={id} className={numberInputLabel}>
        {label}
      </label>
      <input
        id={id}
        className={numberInputValue}
        min={0}
        max={99}
        type="number"
        value={`${value}`}
        onChange={handleChange}
      />
    </div>
  );
}
