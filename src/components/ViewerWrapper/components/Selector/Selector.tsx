import React from 'react';
import {SelectorRow} from '../../types';

type SelectorProps = {
  handleSelect: React.ChangeEventHandler,
  data: SelectorRow[],
}

const Selector = ({handleSelect, data}: SelectorProps) => {
  return (
    <select id="cars" name="cars" onChange={handleSelect}>
      {data.map((item: SelectorRow, index) => <option key={index} value={item.value}>{item.label}</option>)}
    </select>
  )
}

export default Selector;
