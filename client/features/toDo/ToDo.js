import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ToDo = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.topBlock}>
        <View style={styles.itemLeft}>
          <View style={styles.square}></View>
          <Text style={styles.itemText}>{props.toDo.name}</Text>
        </View>
        <View style={styles.circular}></View>
      </View>
      <View style={styles.descriptionBLock}>
        <Text style={styles.descriptionText}>{props.toDo.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginBottom: 20,
  },

  topBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  descriptionBLock: {
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
  descriptionText: {
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
