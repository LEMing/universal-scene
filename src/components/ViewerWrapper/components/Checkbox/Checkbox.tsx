import React, {Dispatch, useCallback, useEffect, useState} from 'react';
import {ViewerOptions} from '../../../TinyViewer/types';
import get from 'lodash/get';
import set from 'lodash/set';

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

  useEffect(function onDataUpdate() {
    const _data = {...data};
    set(_data, path, checked);
    onUpdate(_data);
  }, [checked])

  return <div>
    <input onChange={onChange} id={label} type="checkbox" name={label} checked={checked}/>
    <label htmlFor={label}>{label}</label>
  </div>
}

export default Checkbox;
