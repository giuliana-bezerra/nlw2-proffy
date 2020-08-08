import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';
import Teacher from '../domain/Teacher';
import { getFavorites } from '../dao/favoriteDao';

const { Navigator, Screen } = createBottomTabNavigator();

function StudyTabs() {
  const [favorites, setFavorites] = useState<Teacher[]>([]);

  function loadFavorites() {
    getFavorites().then((favoritedTeachers) => setFavorites(favoritedTeachers));
  }

  return (
    <Navigator
      tabBarOptions={{
        style: {
          elevation: 0,
          shadowOpacity: 0,
          heigth: 64,
        },
        tabStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconStyle: {
          flex: 0,
          width: 20,
          height: 20,
        },
        labelStyle: {
          fontFamily: 'Archivo_700Bold',
          fontSize: 13,
          marginLeft: 16,
        },
        inactiveBackgroundColor: '#fafafc',
        activeBackgroundColor: '#ebebf5',
        inactiveTintColor: '#c1bccc',
        activeTintColor: '#32264d',
      }}
    >
      <Screen
        name='TeacherList'
        children={() => (
          <TeacherList favorites={favorites} loadFavorites={loadFavorites} />
        )}
        options={{
          tabBarLabel: 'Proffys',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name='ios-easel'
                size={size}
                color={focused ? '#8257e5' : color}
              />
            );
          },
        }}
      />
      <Screen
        name='Favorites'
        children={() => (
          <Favorites favorites={favorites} loadFavorites={loadFavorites} />
        )}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name='ios-heart'
                size={size}
                color={focused ? '#8257e5' : color}
              />
            );
          },
        }}
      />
    </Navigator>
  );
}

export default StudyTabs;
