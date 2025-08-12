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
const SUPABASE_URL = "https://ekjojpgepbakurzswolu.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVram9qcGdlcGJha3VyenN3b2x1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5OTQ3MzMsImV4cCI6MjA3MDU3MDczM30.5tnNwkawbvgeuh7-L4zNrPfQR0QxyZmYNdQD_ehN9FU";
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
          placeholder="Seu Nome..."
          value={nome}
          onChangeText={setNome}
          style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
        />
        <Text>E-mail</Text>
        <TextInput
          placeholder="Seu Email..."
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
        />
        <Text>Telefone para contato (com DDD)</Text>
        <TextInput
          placeholder="Ex.: 41912345678"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
          style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
        />
        <Text>Endereço</Text>
        <TextInput
          placeholder="Av. Maringá, 4000"
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
          <Picker.Item label="Auxiliar" value="Auxiliar" />
          <Picker.Item label="Conferente" value="Conferente" />
          <Picker.Item label="Pcl" value="Pcl" />
          <Picker.Item label="Analista" value="Analista" />
        </Picker>

        <Text>Setor</Text>
        <Picker
          selectedValue={departamento}
          onValueChange={(itemValue) => setDepartamento(itemValue)}
          style={{ borderWidth: 1, marginBottom: 8 }}
        >
          <Picker.Item label="Selecione um departamento" value="" />
          <Picker.Item label="JBS" value="JBS" />
          <Picker.Item label="SEARA" value="SEARA" />
          <Picker.Item label="BAT" value="BAT" />
          <Picker.Item label="MDIAS" value="MDIAS" />
          <Picker.Item label="3 CORAÇÕES" value="3 CORAÇÕES" />
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
