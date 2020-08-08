import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Teacher from '../../domain/Teacher';

import styles from './styles';
import EmptyResult from '../../components/EmptyResult';

interface FavoritesProps {
  favorites: Array<Teacher>;
  loadFavorites: Function;
}

const Favorites: React.FC<FavoritesProps> = ({ favorites, loadFavorites }) => {
  useFocusEffect(React.useCallback(() => loadFavorites(), []));

  return (
    <View style={styles.container}>
      <PageHeader title='Meus proffys favoritos' />
      {favorites.length ? (
        <ScrollView
          style={styles.teacherList}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 16,
          }}
        >
          {favorites.map((teacher: Teacher) => (
            <TeacherItem key={teacher.id} teacher={teacher} favorited={true} />
          ))}
        </ScrollView>
      ) : (
        <EmptyResult />
      )}
    </View>
  );
};

export default Favorites;
