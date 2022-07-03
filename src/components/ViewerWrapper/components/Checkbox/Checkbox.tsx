import React, {Dispatch, useCallback, useState} from 'react';
import {ViewerOptions} from '../../../TinyViewer/types';
import get from 'lodash/get';
import useUpdateData from "../commonHooks/useUpdateData";

type CheckboxProps = {
  label: string,
  data: ViewerOptions,
  path: string,
  onUpdate: Dispatch<ViewerOptions>
}
const Checkbox = ({data, path, label, onUpdate}: CheckboxProps) => {
  const status = get(data, path);
  const [checked, setChecked] = useState(status);

  const onChange = useCallback(() => {
    setChecked(!checked);
  }, [checked]);

  useUpdateData({newValue: checked, path, onUpdate, data});

  return <div className="options-component">
    <label htmlFor={label}>{label}</label>
    <input onChange={onChange} id={label} type="checkbox" name={label} checked={checked}/>
  </div>
}

export default Checkbox;
