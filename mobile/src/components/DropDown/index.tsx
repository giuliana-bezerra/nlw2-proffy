import React, { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import styles from './styles';

interface DropDownProps {
  items: { label: string; value: string }[];
  onChangeValue: Function;
  value: string;
}

const DropDown: React.FC<DropDownProps> = ({ items, onChangeValue, value }) => {
  return (
    <DropDownPicker
      placeholder='Selecione'
      items={items}
      defaultValue={value}
      selectedLabelStyle={styles.selectedLabel}
      containerStyle={styles.container}
      style={styles.dropDown}
      itemStyle={styles.dropDownItem}
      labelStyle={styles.label}
      activeLabelStyle={styles.activeLabel}
      activeItemStyle={styles.activeItem}
      dropDownStyle={styles.dropDownList}
      arrowColor='#C1BCCC'
      placeholderStyle={styles.placeholder}
      onChangeItem={(item) => onChangeValue(item.value)}
    />
  );
};

export default DropDown;
