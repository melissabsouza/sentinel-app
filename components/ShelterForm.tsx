import React, { useState } from "react";
import {
  TextInput,
  Button,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import { ShelterFormValues } from "../types/Shelter";

type ShelterFormProps = {
  initialValues?: ShelterFormValues;
  onSubmit: (data: ShelterFormValues) => void;
};

const ShelterForm: React.FC<ShelterFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const [form, setForm] = useState<ShelterFormValues>(
    initialValues ||
      ({
        name: "",
        status: "OPEN",
        totalCapacity: 0,
        currentCapacity: 0,
        availableResources: "",
        userEmail: "user1@shelter.org",
        address: {
          street: "",
          number: 0,
          district: "",
          city: "",
          state: "",
          cep: "",
        },
        contact: {
          email: "",
          phone: "",
        },
      } as ShelterFormValues)
  );

  const handleChange = (field: string, value: any) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setForm((prev) => {
        const parentValue = (prev?.[
          parent as keyof ShelterFormValues
        ] ?? {}) as Record<string, any>;

        return {
          ...prev,
          [parent]: {
            ...parentValue,
            [child]:
              child === "number" ||
              child === "totalCapacity" ||
              child === "currentCapacity"
                ? Number(value)
                : value,
          },
        };
      });
    } else {
      setForm((prev) => ({
        ...prev,
        [field]:
          field === "totalCapacity" ||
          field === "currentCapacity"
            ? Number(value)
            : value,
      }));
    }
  };

  const handleSubmit = () => {
    if (!form.name || !form.address || !form.contact) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }
    onSubmit(form);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Nome:</Text>
      <TextInput
        style={styles.input}
        value={form.name}
        onChangeText={(text) => handleChange("name", text)}
      />

      <Text>Capacidade Total:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(form.totalCapacity)}
        onChangeText={(text) =>
          handleChange("totalCapacity", text)
        }
      />

      <Text>Capacidade Atual:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(form.currentCapacity)}
        onChangeText={(text) =>
          handleChange("currentCapacity", text)
        }
      />

      <Text>Recursos:</Text>
      <TextInput
        style={styles.input}
        value={form.availableResources}
        onChangeText={(text) =>
          handleChange("availableResources", text)
        }
      />

      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        value={form.contact.email}
        onChangeText={(text) =>
          handleChange("contact.email", text)
        }
      />

      <Text>Telefone:</Text>
      <TextInput
        style={styles.input}
        value={form.contact.phone}
        onChangeText={(text) =>
          handleChange("contact.phone", text)
        }
      />

      <Text>Rua:</Text>
      <TextInput
        style={styles.input}
        value={form.address.street}
        onChangeText={(text) =>
          handleChange("address.street", text)
        }
      />

      <Text>Número:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(form.address.number)}
        onChangeText={(text) =>
          handleChange("address.number", text)
        }
      />

      <Text>Bairro:</Text>
      <TextInput
        style={styles.input}
        value={form.address.district}
        onChangeText={(text) =>
          handleChange("address.district", text)
        }
      />

      <Text>Cidade:</Text>
      <TextInput
        style={styles.input}
        value={form.address.city}
        onChangeText={(text) =>
          handleChange("address.city", text)
        }
      />

      <Text>Estado:</Text>
      <TextInput
        style={styles.input}
        value={form.address.state}
        onChangeText={(text) =>
          handleChange("address.state", text)
        }
      />

      <Text>CEP:</Text>
      <TextInput
        style={styles.input}
        value={form.address.cep}
        onChangeText={(text) =>
          handleChange("address.cep", text)
        }
      />

      <Button title="Salvar" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    borderRadius: 6,
  },
});

export default ShelterForm;
