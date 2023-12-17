import axios from 'axios';

export const fetchLoadToDos = async () => {
  try {
    const response = await axios.get('http://192.168.1.67:3000/api/toDos');
    return response.data.toDos;
  } catch (error) {
    console.error('This is Error message of getting all ToDo:', error.message);
    throw error;
  }
};

export const fetchSaveToDo = async (newToDo) => {

  try {
    const response = await axios.post(
      'http://192.168.1.67:3000/api/toDos',
      newToDo
    );

    return response.data;
  } catch (error) {
    console.error('This is Error message from creating toDo:', error.message);
    throw error;
  }
};

export const fetchUpdateToDo = async (toDoUpdate) => {
  try {
    const response = await axios.put(
      `http://192.168.1.67:3000/api/toDos/${toDoUpdate.id}`,
      toDoUpdate,
      {
        headers: {
          'Content-type': 'application/json',
        },
      }
    );

    return response.data[1][0];
  } catch (error) {
    console.error('This is Error from updating message:', error.message);
    throw error;
  }
};

export const fetchDeleteToDo = async (id) => {
  try {
    const response = await axios.delete(
      `http://192.168.1.67:3000/api/toDos/${id}`
    );

    if (200 <= response.status <= 299) {
      return id;
    }

    throw new Error(response.data.message);
  } catch (error) {
    console.error('This is Error message from deleting toDo:', error.message);
    throw error;
  }
};
