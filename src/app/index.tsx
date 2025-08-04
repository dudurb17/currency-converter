import Picker from "@/components/Picker";
import api from "@/services/api";
import { Moeda } from "@/types/Moedas";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const [moedas, setMoedas] = useState<Moeda[]>([]);
  const [loading, setLoading] = useState(true);
  const [valorMoeda, setValorMoeda] = useState<number>(0);
  const [valorConvertido, setValorConvertido] = useState<number>(0);
  const [moedaBValor, setMoedaBValor] = useState<number>(0);
  const [moedaSelecionada, setMoedaSelecionada] = useState<string>();

  const convertMoeda = () => {
    if (moedaBValor === 0 || moedaSelecionada === undefined) {
      return;
    }
    api
      .get(`all/${moedaSelecionada}-BRL`)
      .then((response: any) => {
        let valor = response.data[moedaSelecionada].ask * moedaBValor;
        setValorConvertido(Number(valor.toFixed(2)));
        setValorMoeda(moedaBValor);
      })
      .catch((error: any) => {
        console.log(error.response.data);
      });

    Keyboard.dismiss();
  };

  useEffect(() => {
    api.get("all").then((response: any) => {
      let arrayCurrency: Moeda[] = [];
      Object.keys(response.data).forEach((key) => {
        arrayCurrency.push({
          key: key,
          label: key,
          value: key,
        });
      });
      setMoedaSelecionada(arrayCurrency[0].value);
      setMoedas(arrayCurrency);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.areaMoeda}>
        <Text style={styles.title}>Hello World</Text>
        <Picker
          moedas={moedas}
          moedaSelecionada={moedaSelecionada}
          onChange={(itemValue) => {
            console.log(itemValue);
            setMoedaSelecionada(itemValue);
          }}
        />
      </View>
      <View style={styles.areaValor}>
        <Text style={styles.title}>Digite um valor para converter em R$</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite um valor"
          keyboardType="numeric"
          value={moedaBValor.toString()}
          onChangeText={(text) => {
            setMoedaBValor(Number(text));
          }}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          convertMoeda();
        }}
      >
        <Text style={styles.buttonText}>Converter</Text>
      </TouchableOpacity>

      {valorConvertido > 0 && (
        <View style={styles.areaResultado}>
          <Text style={styles.valorConvertido}>
            {valorMoeda} {moedaSelecionada}
          </Text>
          <Text style={styles.valorDescribe}>corresponde a</Text>
          <Text style={styles.valorConvertido}>
            {valorConvertido} {moedaSelecionada}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 40,
    alignItems: "center",
  },
  areaMoeda: {
    width: "90%",
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 16,
    color: "black",
    fontWeight: "500",
    paddingLeft: 5,
    paddingRight: 5,
  },
  areaValor: {
    width: "90%",
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: "red",
    padding: 10,
    width: "90%",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  areaResultado: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  valorConvertido: {
    textAlign: "center",
    fontSize: 28,
    color: "black",
    fontWeight: "500",
    paddingLeft: 5,
    paddingRight: 5,
  },
  valorDescribe: {
    fontSize: 18,
    color: "black",
    fontWeight: "500",
    paddingLeft: 5,
    paddingRight: 5,
  },
});
