import { Moeda } from "@/types/Moedas";
import { Picker as PickerComponent } from "@react-native-picker/picker";

interface PickerProps {
  moedas: Moeda[];
  moedaSelecionada?: string;
  onChange: (itemValue: string) => void;
}

export default function Picker({
  moedas,
  moedaSelecionada,
  onChange,
}: PickerProps) {
  return (
    <PickerComponent
      selectedValue={moedaSelecionada}
      onValueChange={(value) => onChange(value as string)}
      style={{
        backgroundColor: "white",
      }}
    >
      {moedas.map((moeda) => (
        <PickerComponent.Item
          key={moeda.key}
          label={moeda.label}
          value={moeda.value}
        />
      ))}
    </PickerComponent>
  );
}
