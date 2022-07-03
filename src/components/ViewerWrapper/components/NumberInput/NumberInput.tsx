import React, {Dispatch, useState} from 'react';
import {ViewerOptions} from '../../../TinyViewer/types';
import get from 'lodash/get';
import useUpdateData from "../commonHooks/useUpdateData";

type NumberInputProps = {
  label: string,
  data: ViewerOptions,
  path: string,
  onUpdate: Dispatch<ViewerOptions>
  numberProps: {
    min: number,
    max: number,
    step: number,
  }
}

const NumberInput = ({label, numberProps, data, path, onUpdate}: NumberInputProps) => {
  const initialValue = get(data, path);
  const [value, setValue] = useState<number>(Number(initialValue));

  useUpdateData({newValue: value, path, onUpdate, data});

  return <div>
    <label>{label}</label>
    <input
        min={numberProps.min}
        max={numberProps.max}
        step={numberProps.step}
        type="number"
        onChange={(event) => setValue(Number(event.target.value))} value={value}
    />
  </div>
}

export default NumberInput;
