import {Dispatch, useState} from 'react';
import {ViewerOptions} from '../../../TinyViewer/types';

type NumberInputProps = {
  label: string,
  data: ViewerOptions,
  path: string,
  onUpdate: Dispatch<ViewerOptions>
}

const NumberInput = ({label}: NumberInputProps) => {
  const [value, setValue] = useState();
  return <div>
    <label>{label}</label>
    <input type="number"/>
  </div>
}

export default NumberInput;
