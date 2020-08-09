import React from 'react';
import { Image, Text, View } from 'react-native';

import emptyResults from '../../assets/images/empty-results.png';
import styles from './styles';

function EmptyResult() {
  return (
    <View style={styles.container}>
      <Image style={styles.emptyResultImage} source={emptyResults} />
      <Text style={styles.emptyResultText}>Nenhum resultado.</Text>
    </View>
  );
}

export default EmptyResult;
