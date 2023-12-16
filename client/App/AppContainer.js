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
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store';
import { deleteToDo, loadToDos, saveToDo } from '../features/toDo/ToDoSlice';
import ToDo from '../features/toDo/ToDo';
import DatePicker from '../features/datePicker/DatePicker';

export default function AppContainer() {
  const toDos = useSelector((state) => state.toDo.ToDoList);
  const toDo = useSelector((state) => state.toDo.ToDo);
  const dispatch = useAppDispatch();

  const [toDoName, setToDoName] = useState('');
  const [toDoDescription, setToDoDescription] = useState('');

  useEffect(() => {
    dispatch(loadToDos());
  }, []);
  // useEffect(() => {
  //   dispatch(saveToDo(toDo));
  // }, [toDo]);

  const handleAddToDo = () => {
    Keyboard.dismiss();
    newToDo = { toDoName, toDoDescription };
    dispatch(saveToDo(newToDo));
    setToDoName('');
    setToDoDescription('');
  };

  const completeToDo = (id) => {
    dispatch(deleteToDo(id));
  };

  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Today's ToDos */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>
          <View style={styles.items}>
            {/* This is where the tasks will go! */}
            {toDos.length ? (
              toDos.map((toDoItem) => (
                <TouchableOpacity
                  key={toDoItem.id}
                  onPress={() => completeToDo(toDoItem.id)}
                >
                  <ToDo toDo={toDoItem} />
                </TouchableOpacity>
              ))
            ) : (
              <Text>No Tasks</Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
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
          <TouchableOpacity onPress={() => handleAddToDo()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
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
      <View>
        {/* <DatePicker /> */}
      </View>
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
  items: {
    marginTop: 30,
  },
  writeToDoWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  writeToDoNameWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});

