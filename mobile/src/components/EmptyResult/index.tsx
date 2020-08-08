import React from 'react';
import { Image, Text } from 'react-native';

import emptyResults from '../../assets/images/empty-results.png';
import styles from './styles';

function EmptyResult() {
  return (
    <>
      <Image style={styles.emptyResultImage} source={emptyResults} />
      <Text style={styles.emptyResultText}>Nenhum resultado.</Text>
    </>
  );
}

export default EmptyResult;
