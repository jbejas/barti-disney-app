/* 
* Custom Select Component
*
* description: custom Select component
* @returns {JSX.Element}
*/

import React from 'react';
import styled from 'styled-components';

const Select = styled.select`
  padding: 0.4em;
  background: white;
  border: 1px solid #C2CCDA;
  border-radius: 4px;
  outline: none;
  width: 100%;
`;

type Option = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  options: Option[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
};

const CustomSelect: React.FC<CustomSelectProps> = ({ options, onChange, value }) => (
  <Select onChange={onChange} value={value}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </Select>
);

export default CustomSelect;