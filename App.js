
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native';


export default function App() {
  const [tarefa, setTarefa] = useState('');
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    async function carregarTarefas() {
      const tarefasSalvas = await AsyncStorage.getItem('tarefas');
      if (tarefasSalvas) {
        setTarefas(JSON.parse(tarefasSalvas));
      }
    }
    carregarTarefas();
  }, []);

  const salvarTarefas = async (novasTarefas) => {
    await AsyncStorage.setItem('tarefas', JSON.stringify(novasTarefas));
  };

  const adicionarTarefa = async () => {
    if (tarefa.trim() === '') {
      alert('Digite uma tarefa!');
      return;
    }
    const novasTarefas = [...tarefas, tarefa];
    setTarefas(novasTarefas);
    await salvarTarefas(novasTarefas);
    setTarefa('');
  };

  const removerTarefa = async (index) => {
    const novasTarefas = tarefas.filter((_, i) => i !== index);
    setTarefas(novasTarefas);
    await salvarTarefas(novasTarefas);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text style={styles.titulo}>Rotina de um Salsicha 🐶</Text>
      <Image
      source={{ uri: 'https://i.pinimg.com/originals/9a/a8/05/9aa8051f438e26820e754322a687c082.jpg' }}
      style={styles.imagem}
      />
      <Text style={styles.texto}>Adicione as tarefas do seu doguinho abaixo!</Text>
      <TextInput
      style={styles.input}
      placeholder="Digite uma tarefa aqui!"
      value={tarefa}
      onChangeText={setTarefa}
      />
      <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarTarefa}>
      <Text style={[styles.textoBotaoAdicionar, { fontSize: 17 }]}>Adicionar 🐾</Text>
      </TouchableOpacity>
      <FlatList
      data={tarefas}
      keyExtractor={(_, index) => index.toString()}
      style={{ marginTop: 20 }}
      renderItem={({ item, index }) => (
        <View style={styles.tarefaItem}>
        <Text style={styles.tarefaTexto}>{item}</Text>
        <TouchableOpacity style={styles.botaoRemover} onPress={() => removerTarefa(index)}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>🗑️</Text>
        </TouchableOpacity>
        </View>
      )}
      ListEmptyComponent={<Text style={{ textAlign: 'center', color: '#aaa' }}>Nenhuma tarefa adicionada ainda para o salsicha!</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E0F7E9',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 60,
  },
  texto: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#7D7D7D',
  },
  botaoAdicionar: {
    backgroundColor: '#c3e6f3ff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    marginTop: 10,
  },
  imagem: {
    width: 200,
    height: 200,
    borderRadius: 40,
    marginBottom: 20,
    margin: 'auto',
  },
  input: {
    padding: 15,
    backgroundColor: '#F9FAFB',
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 5,
  },
  tarefaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 5,
    marginBottom: 10,
  },
  tarefaTexto: {
    fontSize: 16,
    flex: 1,
    color: '#5A5A5A',
  },
  botaoRemover: {
    backgroundColor: '#E5E5E5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 10,
  },
});