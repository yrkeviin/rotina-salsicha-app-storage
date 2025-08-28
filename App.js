
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
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
      <Text style={styles.texto}>Adicione as tarefas do seu doguinho abaixo!</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite uma tarefa aqui!"
        value={tarefa}
        onChangeText={setTarefa}
      />
      <Button style={styles.botaoAdicionar} title="Adicionar 🐾" onPress={adicionarTarefa} />
      <FlatList
        data={tarefas}
        keyExtractor={(_, index) => index.toString()}
        style={{ marginTop: 20 }}
        renderItem={({ item, index }) => (
          <View style={styles.tarefaItem}>
            <Text style={styles.tarefaTexto}>{item}</Text>
            <TouchableOpacity style={styles.botaoRemover} onPress={() => removerTarefa(index)}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Remover</Text>
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
    backgroundColor: '#c5c5c5ff',
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
    color: '#646464ff',
  },
  input: {
    borderWidth: 2,
    borderColor: '#ffffffff',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  botaoAdicionar: {
    backgroundColor: '#38b6ffff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginTop: 10,
  },
  tarefaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#38b6ffff',
    padding: 12,
    borderRadius: 5,
    marginBottom: 10,
  },
  tarefaTexto: {
    fontSize: 16,
    flex: 1,
    color: '#fff',
  },
  botaoRemover: {
    backgroundColor: '#e74c3c',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 10,
  },
});