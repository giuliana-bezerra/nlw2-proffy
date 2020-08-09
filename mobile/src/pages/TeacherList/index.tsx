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
import DropDown from '../../components/DropDown';

interface TeacherListProps {
  favorites: Array<Teacher>;
  loadFavorites: Function;
}

const subjects = [
  { label: 'Artes', value: 'Artes' },
  { label: 'Biologia', value: 'Biologia' },
  { label: 'Ciências', value: 'Ciências' },
  { label: 'Educação Física', value: 'Educação Física' },
  { label: 'Física', value: 'Física' },
  { label: 'Geografia', value: 'Geografia' },
  { label: 'História', value: 'História' },
  { label: 'Matemática', value: 'Matemática' },
  { label: 'Português', value: 'Português' },
  { label: 'Química', value: 'Química' },
];
const weekDays = [
  { label: 'Segunda', value: '1' },
  { label: 'Terça', value: '2' },
  { label: 'Quarta', value: '3' },
  { label: 'Quinta', value: '4' },
  { label: 'Sexta', value: '5' },
  { label: 'Sábado', value: '6' },
  { label: 'Domingo', value: '0' },
];

const timeOptions = [
  { label: '8 horas', value: '8:00' },
  { label: '9 horas', value: '9:00' },
  { label: '10 horas', value: '10:00' },
  { label: '11 horas', value: '11:00' },
  { label: '12 horas', value: '12:00' },
  { label: '13 horas', value: '13:00' },
  { label: '14 horas', value: '14:00' },
  { label: '15 horas', value: '15:00' },
  { label: '16 horas', value: '16:00' },
  { label: '17 horas', value: '17:00' },
  { label: '18 horas', value: '18:00' },
];

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
            <DropDown
              items={subjects}
              onChangeValue={setSubject}
              value={subject}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da Semana</Text>
                <DropDown
                  items={weekDays}
                  onChangeValue={setWeekDay}
                  value={week_day}
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <DropDown
                  items={timeOptions}
                  onChangeValue={setTime}
                  value={time}
                />
              </View>
            </View>
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
