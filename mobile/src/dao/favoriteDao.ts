import AsyncStorage from '@react-native-community/async-storage';
import Teacher from '../domain/Teacher';

export async function saveFavorites(favorites: Array<Teacher>) {
  return AsyncStorage.setItem('favorites', JSON.stringify(favorites));
}

export async function getFavorites() {
  const favoritesJson = await AsyncStorage.getItem('favorites');

  const favorites = favoritesJson ? JSON.parse(favoritesJson) : [];
  return favorites;
}
