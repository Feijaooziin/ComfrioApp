import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";
import { Picker } from "@react-native-picker/picker";

// --- CONFIG ---
const SUPABASE_URL = "https://YOUR_SUPABASE_PROJECT.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function App() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cargo, setCargo] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Constants.platform?.android) {
      // Nenhuma permissão especial necessária para estes campos
    }
  }, []);

  const handleSave = async () => {
    if (!nome || !email || !telefone || !endereco || !cargo || !departamento) {
      Alert.alert("Validação", "Todos os campos são obrigatórios");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("funcionarios").insert([
        {
          nome,
          email,
          telefone,
          endereco,
          cargo,
          departamento,
        },
      ]);

      if (error) {
        console.log(error);
        Alert.alert("Erro", "Não foi possível salvar o funcionário");
      } else {
        Alert.alert("Sucesso", "Funcionário salvo com sucesso");
        setNome("");
        setEmail("");
        setTelefone("");
        setEndereco("");
        setCargo("");
        setDepartamento("");
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Erro", "Ocorreu um erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <ScrollView>
        <Text>Nome completo</Text>
        <TextInput
          value={nome}
          onChangeText={setNome}
          style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
        />
        <Text>E-mail</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
        />
        <Text>Telefone para contato</Text>
        <TextInput
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
          style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
        />
        <Text>Endereço</Text>
        <TextInput
          value={endereco}
          onChangeText={setEndereco}
          style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
        />

        <Text>Cargo</Text>
        <Picker
          selectedValue={cargo}
          onValueChange={(itemValue) => setCargo(itemValue)}
          style={{ borderWidth: 1, marginBottom: 8 }}
        >
          <Picker.Item label="Selecione um cargo" value="" />
          <Picker.Item label="Gerente" value="Gerente" />
          <Picker.Item label="Supervisor" value="Supervisor" />
          <Picker.Item label="Analista" value="Analista" />
          <Picker.Item label="Assistente" value="Assistente" />
        </Picker>

        <Text>Departamento</Text>
        <Picker
          selectedValue={departamento}
          onValueChange={(itemValue) => setDepartamento(itemValue)}
          style={{ borderWidth: 1, marginBottom: 8 }}
        >
          <Picker.Item label="Selecione um departamento" value="" />
          <Picker.Item label="RH" value="RH" />
          <Picker.Item label="Financeiro" value="Financeiro" />
          <Picker.Item label="Vendas" value="Vendas" />
          <Picker.Item label="TI" value="TI" />
        </Picker>

        <View style={{ height: 12 }} />
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button title="Salvar" onPress={handleSave} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
