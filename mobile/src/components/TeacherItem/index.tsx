import React, { useState } from 'react';
import { View, Text, Image, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import api from '../../services/api';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import styles from './styles';
import Teacher from '../../domain/Teacher';
import { getFavorites, saveFavorites } from '../../dao/favoriteDao';

interface TeacherItemProps {
  teacher: Teacher;
  favorited?: boolean;
  enableFavor?: boolean;
}
const TeacherItem: React.FC<TeacherItemProps> = ({
  teacher,
  favorited,
  enableFavor,
}) => {
  const [isFavorited, setFavorited] = useState(favorited);

  function openLinkToWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
    createNewConnection();
  }

  function createNewConnection() {
    api.post('connections', {
      user_id: teacher.id,
    });
  }

  async function toggleFavorite() {
    const favorites = await getFavorites();

    if (isFavorited) disfavor(favorites);
    else favor(favorites);

    await saveFavorites(favorites);
  }

  function disfavor(favorites: Array<Teacher>) {
    const favoritedIndex = favorites.findIndex(
      (teacherItem: Teacher) => teacherItem.id === teacher.id,
    );

    favorites.splice(favoritedIndex, 1);
    setFavorited(false);
  }

  function favor(favorites: Array<Teacher>) {
    favorites.push(teacher);
    setFavorited(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{ uri: teacher.avatar }} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>
      <Text style={styles.bio}>{teacher.bio}</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'   '}
          <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text>
        <View style={styles.buttonsContainer}>
          {enableFavor && (
            <RectButton
              onPress={toggleFavorite}
              style={[
                styles.favoriteButton,
                isFavorited ? styles.favorited : {},
              ]}
            >
              {isFavorited ? (
                <Image source={unfavoriteIcon} />
              ) : (
                <Image source={heartOutlineIcon} />
              )}
            </RectButton>
          )}

          <RectButton onPress={openLinkToWhatsapp} style={styles.contactButton}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
