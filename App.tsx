import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

type TodoItem = {
  uniqueId: number;
  description: string;
  completed: boolean;
};

const TodoListApp = () => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [inputText, setInputText] = useState('');

  const handleAddTodo = useCallback(() => {
    if (!inputText.trim()) return;

    const newTodo: TodoItem = {
      uniqueId: Date.now(),
      description: inputText.trim(),
      completed: false,
    };

    setTodoItems(prevItems => [...prevItems, newTodo]);
    setInputText('');
  }, [inputText]);

  const handleToggleCompletion = useCallback((id: number) => {
    setTodoItems(prevItems =>
      prevItems.map(item =>
        item.uniqueId === id ? { ...item, completed: !item.completed } : item
      )
    );
  }, []);

  const handleRemoveTodo = useCallback((id: number) => {
    setTodoItems(prevItems => prevItems.filter(item => item.uniqueId !== id));
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.mainContainer}>
        <Text style={styles.appTitle}>Daily Tasks</Text>

        <View style={styles.inputSection}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="What needs to be done?"
          />
          <Pressable
            onPress={handleAddTodo}
            disabled={!inputText.trim()}
            style={({pressed}) => [
              styles.addButton,
              {opacity: pressed ? 0.7 : 1},
              !inputText.trim() && styles.disabledButton
            ]}
          >
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
        </View>

        <ScrollView style={styles.todoList}>
          {todoItems.map(item => (
            <View key={item.uniqueId} style={styles.todoItem}>
              <Pressable
                onPress={() => handleToggleCompletion(item.uniqueId)}
                style={styles.checkbox}
              >
                <Text>{item.completed ? '✅' : '⬜'}</Text>
              </Pressable>
              <Text style={[
                styles.todoText,
                item.completed && styles.completedText
              ]}>
                {item.description}
              </Text>
              <Pressable
                onPress={() => handleRemoveTodo(item.uniqueId)}
                style={styles.deleteBtn}
              >
                <Text style={styles.deleteBtnText}>🗑️</Text>
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#00DDFF',
  },
  mainContainer: {
    flex: 1,
    padding: 16,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 16,
    color: '#2c3e50',
  },
  inputSection: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    backgroundColor: 'white',
  },
  addButton: {
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#95a5a6',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  todoList: {
    flex: 1,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  checkbox: {
    marginRight: 12,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: '#34495e',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#7f8c8d',
  },
  deleteBtn: {
    padding: 4,
  },
  deleteBtnText: {
    fontSize: 18,
  },
});

export default TodoListApp;