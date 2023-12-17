import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Platform,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store';
import { loadToDos, saveToDo } from '../features/toDo/ToDoSlice';
import ToDo from '../features/toDo/ToDo';

export default function AppContainer() {
  const toDos = useSelector((state) => state.toDo.ToDoList);
  const dispatch = useAppDispatch();

  const [showAdd, setShowAdd] = useState(false);

  const [filter, setFilter] = useState('all');

  const [toDoName, setToDoName] = useState('');
  const [toDoDescription, setToDoDescription] = useState('');

  const [isImportant, setIsImportant] = useState(false);

  useEffect(() => {
    dispatch(loadToDos());
  }, []);

  const handleFilter = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const filteredToDos =
    filter === 'important'
      ? toDos.filter((toDoItem) => toDoItem.isImportant)
      : toDos;

  const handShowAddMode = () => {
    setShowAdd(true);
  };

  const handleAddToDo = () => {
    Keyboard.dismiss();
    const newToDo = { toDoName, toDoDescription, isImportant };
    dispatch(saveToDo(newToDo));
    setToDoName('');
    setToDoDescription('');
    setShowAdd(false);
  };
  const handleCancelAddToDo = () => {
    Keyboard.dismiss();
    setShowAdd(false);
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.tasksWrapper}>
          <View style={styles.priorityAndAdd}>
            <TouchableOpacity onPress={() => handleFilter('all')}>
              <Text
                style={
                  filter === 'all'
                    ? styles.selectedFilter
                    : styles.unselectedFilter
                }
              >
                Все
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilter('important')}>
              <Text
                style={
                  filter === 'important'
                    ? styles.selectedFilter
                    : styles.unselectedFilter
                }
              >
                Важные
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionTitle}>Задачи</Text>
          <View style={styles.items}>
            {filteredToDos.length ? (
              filteredToDos.map((toDoItem) => (
                <ToDo key={toDoItem.id} toDo={toDoItem} />
              ))
            ) : (
              <Text>Нету задач пока.</Text>
            )}
          </View>
        </View>
      </ScrollView>
      {showAdd ? (
        <View style={styles.createToDo}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'android' ? 'height' : 'padding'}
            style={styles.writeToDoWrapper}
          >
            <View style={styles.writeToDoNameWrapper}>
              <TextInput
                style={styles.input}
                placeholder={'Write a task'}
                value={toDoName}
                onChangeText={(text) => setToDoName(text)}
              />
            </View>
            <View style={styles.writeToDoDescriptionWrapper}>
              <TextInput
                style={styles.input}
                placeholder={'Write a task'}
                value={toDoDescription}
                onChangeText={(text) => setToDoDescription(text)}
              />
            </View>
          </KeyboardAvoidingView>
          <View style={styles.priorityAndAdd}>
            <TouchableOpacity onPress={() => handleCancelAddToDo()}>
              <View style={styles.cancelAddConfirm}>
                <Text style={styles.addText}>❌</Text>
              </View>
            </TouchableOpacity>
            <View>
              <Text>Выберите важность:</Text>
              <RadioButton.Group
                onValueChange={(value) => setIsImportant(value)}
                value={isImportant}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton value={false} color="blue" />
                  <Text>Не важная</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton value={true} color="red" />
                  <Text>Важная</Text>
                </View>
              </RadioButton.Group>
            </View>
            <TouchableOpacity onPress={() => handleAddToDo()}>
              <View style={styles.addConfirm}>
                <Text style={styles.addText}>✔️</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity onPress={() => handShowAddMode()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>➕</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  selectedFilter: {
    textAlign: 'center',
    borderRadius: 5,
    borderWidth: 2,
    paddingHorizontal: 5,
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#55BCF6',
    color: 'red',
  },
  unselectedFilter: {
    textAlign: 'center',
    paddingHorizontal: 5,
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 5,
    borderWidth: 2,
  },
  items: {
    marginTop: 30,
  },
  createToDo: {
    gap:10,
    backgroundColor: '#F5FFFA',
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  writeToDoWrapper: {
    gap:10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  writeToDoNameWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  priorityAndAdd: {
    gap: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  writeToDoDescriptionWrapper: {
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    margin: 5,
    width: 60,
    height: 60,
    backgroundColor: '#81b0ff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addConfirm: {
    margin: 5,
    width: 60,
    height: 60,
    backgroundColor: '#00FA9A',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  cancelAddConfirm: {
    margin: 5,
    width: 60,
    height: 60,
    backgroundColor: '#B0C4DE',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    fontSize: 20,
  },
});
