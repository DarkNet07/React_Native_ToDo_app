import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateToDo, deleteToDo } from '../toDo/ToDoSlice';
import { TextInput } from 'react-native-paper';
const ToDo = (props) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isDoneToggle, setIsDoneToggle] = useState(props.toDo.isDone);
  const [isDelayed, setIsDelayed] = useState(false);
  const [updatedName, setUpdatedName] = useState(props.toDo.name);
  const [updatedDescription, setUpdatedDescription] = useState(
    props.toDo.description
  );

  const toDoDate = new Date(props.toDo.createdAt).getDate();
  const today = new Date().getDate();

  const toggleDelayedToDo = () => {
    toDoDate - today > 1 ? setIsDelayed(true) : setIsDelayed(false);
  };
  useEffect(() => {
    const updatedToDo = {
      id: props.toDo.id,
      name: props.toDo.name,
      description: props.toDo.description,
      isDone: isDoneToggle,
    };
    dispatch(updateToDo(updatedToDo));
  }, [isDoneToggle]);

  useEffect(() => {
    toggleDelayedToDo();
  }, []);

  const toggleSwitch = () => {
    setIsDoneToggle((prevIsDoneToggle) => !prevIsDoneToggle);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleDeleteToDo = (id) => {
    dispatch(deleteToDo(id));
  };

  const handleUpdateToDo = () => {
    const updatedToDo = {
      id: props.toDo.id,
      isDone: props.toDo.isDone,
      name: updatedName,
      description: updatedDescription,
    };
    dispatch(updateToDo(updatedToDo));
    setIsEditing(false);
  };
  return (
    <View style={!isDelayed ? styles.item : styles.itemDelayed}>
      <View style={styles.topBlock}>
        <View style={styles.itemLeft}>
          <Switch
            style={styles.square}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isDoneToggle ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isDoneToggle}
          />
          <View style={styles.topTextBlock}>
            <Text style={styles.itemText}>
              {props.toDo.isImportant ? '❗' : ''} {props.toDo.name}
            </Text>
            <Text>
              Дата: {new Date(props.toDo.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>
        <View style={styles.circularAndEdit}>
          <TouchableOpacity onPress={() => handleDeleteToDo(props.toDo.id)}>
            <Text style={styles.editToDo}>❌</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleEditToggle}>
            <View style={styles.editToDo}>
              <Text style={styles.editToDo}>✍️</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.descriptionBLock}>
        <Text style={styles.descriptionText}>
          Описание: {props.toDo.description}
        </Text>
      </View>
      {isEditing && (
        <View style={styles.editInputs}>
          <View style={styles.editToDoNameWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Изменить название"
              value={updatedName}
              onChangeText={(text) => setUpdatedName(text)}
            />
          </View>
          <View style={styles.editToDoDescriptionWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Изменить описание"
              value={updatedDescription}
              onChangeText={(text) => setUpdatedDescription(text)}
            />
            <TouchableOpacity
              style={styles.addTouchableWrapper}
              onPress={handleUpdateToDo}
            >
              <View style={styles.addWrapper}>
                <Text style={styles.addText}>Обновить</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemDelayed: {
    backgroundColor: '#FFB6C1',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginBottom: 20,
  },

  topBlock: {
    // maxWidth: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topTextBlock: {
    // flexGrow: 1,
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  itemLeft: {
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  descriptionBLock: {
    // flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  circularAndEdit: {
    marginLeft: -25,
    gap: 25,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  addTouchableWrapper: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  editInputs: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },

  addWrapper: {
    borderRadius: 5,
    marginHorizontal: 'auto',
    maxWidth: '35%',
    backgroundColor: '#00FA9A',
  },
  addText: {
    padding: 5,
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 5,
  },

  editToDoNameWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  editToDoDescriptionWrapper: {},

  input: {
    paddingHorizontal: 5,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderColor: '#C0C0C0',
    borderWidth: 2,
    fontSize: 18,
    width: 250,
  },

  square: {
    marginRight: 15,
  },
  itemText: {
    // flexShrink: 1,
    fontSize: 18,
    fontWeight: 'bold',
    maxWidth: '80%',
  },
  editToDo: {
    fontSize: 20,
  },
  descriptionText: {
    fontSize: 18,
    maxWidth: '80%',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default ToDo;

