import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  Keyboard,
} from "react-native";
import { RectButton, TextInput } from "react-native-gesture-handler";
import { userDataBase } from "../services/firebase";

import Icon from "@expo/vector-icons/FontAwesome";

const baseColor = "#801EBE";

interface User {
  id: string;
  nome: string;
  telefone: string;
}

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [userForm, setUserForm] = useState<Omit<User, "id">>({
    nome: "",
    telefone: "",
  });

  function onSubmit() {
    Keyboard.dismiss();

    userDataBase.push(userForm, (err) => {
      if (err) Alert.alert("Erro", "ocorreu um erro");

      setUserForm({
        nome: "",
        telefone: "",
      });
    });
  }

  function onDelete(id: string) {
    userDataBase.child(id).remove((err) => {
      if (err) Alert.alert("Erro", "ocorreu um erro");
    });
  }

  useEffect(() => {
    userDataBase.on("value", (users) => {
      const data: User[] = [];

      users.forEach((user) => {
        data.push({
          id: String(user.key),
          nome: user.val().nome,
          telefone: user.val().telefone,
        });
      });

      setUsers(data);
    });
  }, [setUsers]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.textTitle}>PDM</Text>
      </View>

      <View>
        <Text style={styles.subTitle}>Cadastrar</Text>
      </View>

      <View style={styles.dataContainer}>
        <View>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.inputMedidas}
            placeholder="Nome"
            value={userForm.nome}
            onChangeText={(value) =>
              setUserForm((prev) => ({ ...prev, nome: value }))
            }
          />
        </View>
        <View>
          <Text style={styles.label}>Número</Text>
          <TextInput
            style={styles.inputMedidas}
            placeholder="Número"
            keyboardType="numeric"
            value={userForm.telefone}
            onChangeText={(value) =>
              setUserForm((prev) => ({ ...prev, telefone: value }))
            }
          />
        </View>
      </View>

      <View style={styles.dataContainer}>
        <RectButton style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </RectButton>
      </View>

      <View style={styles.lineContainer}>
        <View style={styles.line}></View>
      </View>

      <ScrollView style={styles.list}>
        {users.map((user) => (
          <View key={user.id} style={styles.userCard}>
            <Text style={styles.textCard}>
              {user.nome} - {user.telefone}
            </Text>

            <RectButton onPress={() => onDelete(user.id)}>
              <Icon name="close" size={24} color="#FFF" />
            </RectButton>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#FFFEFF",
  },
  title: {
    height: 75,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#801EBE",
  },
  textTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFF",
  },
  dataContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    padding: 15,
  },
  userCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#801EBE",
    marginVertical: 5,
  },
  textCard: {
    color: "#FFF",
  },
  dataContainerResultado: {
    display: "flex",
    flexDirection: "row",
  },

  inputMedidas: {
    backgroundColor: "#f0f0f7",
    width: 350,
    height: 45,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderRadius: 15,
  },
  inputResultado: {
    backgroundColor: "#f0f0f7",
    width: 175,
    height: 45,
    paddingHorizontal: 20,
    margin: 8,
    borderRadius: 15,
  },
  label: {
    fontSize: 15,
    marginBottom: 8,
    marginLeft: 12,
    color: "#383838",
  },
  button: {
    width: 150,
    height: 45,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    backgroundColor: "#801EBE",
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFF",
  },
  subTitle: {
    color: "#801EBE",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    marginTop: 30,
    marginLeft: 20,
  },
  lineContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    height: 1.5,
    width: 350,
    backgroundColor: "#B4B4B4",
    marginTop: 25,
  },
});

export { Home };
