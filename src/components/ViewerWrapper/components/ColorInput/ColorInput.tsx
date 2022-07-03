import React, {Dispatch, useState} from 'react';
import {ViewerOptions} from '../../../TinyViewer/types';
import get from 'lodash/get';
import useUpdateData from "../commonHooks/useUpdateData";
import * as THREE from 'three';

type ColorInputProps = {
  label: string,
  data: ViewerOptions,
  path: string,
  onUpdate: Dispatch<ViewerOptions>
}

const ColorInput = ({label, data, path, onUpdate}: ColorInputProps) => {
  const initialValue = get(data, path);
  const color = new THREE.Color(initialValue).getHexString();
  const [value, setValue] = useState<string>(`#${color}`);

  useUpdateData({newValue: value, path, onUpdate, data});
  return <div className="options-component">
    <label>{label}</label>
    <input
        type="color"
        onChange={(event) => setValue(event.target.value)}
        value={value}
    />
  </div>
}

export default ColorInput;
