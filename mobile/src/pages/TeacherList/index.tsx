import React, { useState, useRef } from 'react';
import { View, ScrollView, Text, TextInput, Picker } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons/';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import api from '../../services/api';
import Teacher from '../../domain/Teacher';

import styles from './styles';
import EmptyResult from '../../components/EmptyResult';

interface TeacherListProps {
  favorites: Array<Teacher>;
  loadFavorites: Function;
}

const TeacherList: React.FC<TeacherListProps> = ({
  favorites,
  loadFavorites,
}) => {
  const [isFiltersVisible, setFilterVisible] = useState(false);
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');
  const [teachers, setTeachers] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, []),
  );

  function toggleFiltersVisible() {
    setFilterVisible(!isFiltersVisible);
  }

  function filterTeachers() {
    api
      .get('classes', {
        params: {
          subject,
          week_day,
          time,
        },
      })
      .then((res) => {
        console.log(res.data);
        setTeachers(res.data);
        setFilterVisible(false);
      });
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title='Proffys disponíveis'
        headerRight={
          <BorderlessButton onPress={toggleFiltersVisible}>
            <Feather name='filter' size={20} color='#FFF' />
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <View style={styles.input}>
              <Picker
                selectedValue={subject}
                onValueChange={(text) => setSubject(text)}
              >
                <Picker.Item label='Selecionar...' value='' />
                <Picker.Item label='Artes' value='Artes' />
                <Picker.Item label='Biologia' value='Biologia' />
                <Picker.Item label='Ciências' value='Ciências' />
                <Picker.Item label='Educação Física' value='Educação Física' />
                <Picker.Item label='Física' value='Física' />
                <Picker.Item label='Geografia' value='Geografia' />
                <Picker.Item label='História' value='História' />
                <Picker.Item label='Matemática' value='Matemática' />
                <Picker.Item label='Português' value='Português' />
                <Picker.Item label='Química' value='Química' />
              </Picker>
            </View>

            <Text style={styles.label}>Dia da Semana</Text>
            <View style={styles.input}>
              <Picker
                selectedValue={week_day}
                onValueChange={(text) => setWeekDay(text)}
              >
                <Picker.Item label='Selecionar...' value='' />
                <Picker.Item label='Segunda-feira' value='1' />
                <Picker.Item label='Terça-feira' value='2' />
                <Picker.Item label='Quarta-feira' value='3' />
                <Picker.Item label='Quinta-feira' value='4' />
                <Picker.Item label='Sexta-feira' value='5' />
                <Picker.Item label='Sábado-feira' value='6' />
                <Picker.Item label='Domingo-feira' value='0' />
              </Picker>
            </View>
            <Text style={styles.label}>Horário</Text>
            <TextInput
              style={styles.input}
              value={time}
              onChangeText={(text) => setTime(text)}
              placeholder='Qual horário?'
            />
            <RectButton onPress={filterTeachers} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
      {teachers.length ? (
        <ScrollView
          style={styles.teacherList}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 16,
          }}
        >
          {teachers.map((teacher: Teacher, index: number) => (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorited={
                favorites.find((favorite) => favorite.id === teacher.id)
                  ? true
                  : false
              }
              enableFavor
            />
          ))}
        </ScrollView>
      ) : (
        <EmptyResult />
      )}
    </View>
  );
};

export default TeacherList;
