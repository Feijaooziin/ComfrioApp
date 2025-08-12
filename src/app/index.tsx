import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

// --- CONFIG ---
const SUPABASE_URL = "https://ekjojpgepbakurzswolu.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVram9qcGdlcGJha3J6c3dvbHVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5OTQ3MzMsImV4cCI6MjA3MDU3MDczM30.5tnNwkawbvgeuh7-L4zNrPfQR0QxyZmYNdQD_ehN9FU";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function Index() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cargo, setCargo] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [loading, setLoading] = useState(false);

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
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.label}>Nome completo</Text>
        <TextInput
          placeholder="Seu Nome..."
          value={nome}
          onChangeText={setNome}
          style={styles.input}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          placeholder="Seu Email..."
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
          placeholderTextColor="#999"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Telefone para contato (com DDD)</Text>
        <TextInput
          placeholder="Ex.: 41912345678"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
          style={styles.input}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Endereço</Text>
        <TextInput
          placeholder="Av. Maringá, 4000"
          value={endereco}
          onChangeText={setEndereco}
          style={styles.input}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Cargo</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={cargo}
            onValueChange={(itemValue) => setCargo(itemValue)}
            style={styles.picker}
            dropdownIconColor="#555"
          >
            <Picker.Item label="Selecione um cargo" value="" />
            <Picker.Item label="Auxiliar" value="Auxiliar" />
            <Picker.Item label="Conferente" value="Conferente" />
            <Picker.Item label="Pcl" value="Pcl" />
            <Picker.Item label="Analista" value="Analista" />
          </Picker>
        </View>

        <Text style={styles.label}>Setor</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={departamento}
            onValueChange={(itemValue) => setDepartamento(itemValue)}
            style={styles.picker}
            dropdownIconColor="#555"
          >
            <Picker.Item label="Selecione um departamento" value="" />
            <Picker.Item label="JBS" value="JBS" />
            <Picker.Item label="SEARA" value="SEARA" />
            <Picker.Item label="BAT" value="BAT" />
            <Picker.Item label="MDIAS" value="MDIAS" />
            <Picker.Item label="3 CORAÇÕES" value="3 CORAÇÕES" />
          </Picker>
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#FF6B00"
            style={{ marginTop: 20 }}
          />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  scrollContent: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  input: {
    backgroundColor: "#FFF",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
    marginBottom: 16,
    fontSize: 15,
    color: "#222",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  pickerWrapper: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
    marginBottom: 16,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    color: "#444",
  },
  button: {
    backgroundColor: "#1E3A8A",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
    shadowColor: "#1E3A8A",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 17,
  },
});
