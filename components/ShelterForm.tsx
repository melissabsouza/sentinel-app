import React, { useState } from "react";
import {
  TextInput,
  Button,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ShelterFormValues } from "../types/Shelter";
import { Rubik_400Regular } from "@expo-google-fonts/rubik/400Regular";
import { Rubik_500Medium } from "@expo-google-fonts/rubik/500Medium";
import { useFonts } from "@expo-google-fonts/rubik/useFonts";
import { z } from "zod";

const shelterValidationSchema = z
  .object({
    name: z
      .string()
      .min(3, "Nome deve ter pelo menos 3 caracteres")
      .nonempty("Nome não pode estar vazio"),

    totalCapacity: z
      .number()
      .int("Capacidade total deve ser um número inteiro")
      .min(0, "Capacidade total não pode ser negativa"),

    currentCapacity: z
      .number()
      .int("Capacidade atual deve ser um número inteiro")
      .min(0, "Capacidade atual não pode ser negativa"),

    availableResources: z
      .string()
      .min(
        3,
        "Recursos disponíveis deve ter pelo menos 3 caracteres"
      )
      .nonempty(
        "Recursos disponíveis não pode estar vazio"
      ),

    status: z.enum(["OPEN", "CLOSED", "CROWDED"]),

    userEmail: z.string().email("Email inválido"),

    address: z.object({
      street: z
        .string()
        .min(3, "Rua deve ter pelo menos 3 caracteres")
        .nonempty("Rua não pode estar vazia"),

      number: z
        .number()
        .int("Número deve ser um número inteiro")
        .min(1, "Número deve ser maior que 0"),

      district: z
        .string()
        .min(3, "Bairro deve ter pelo menos 3 caracteres"),

      city: z
        .string()
        .min(3, "Cidade deve ter pelo menos 3 caracteres")
        .nonempty("Cidade não pode estar vazia"),

      state: z
        .string()
        .min(3, "Estado deve ter mais que 3 caracteres"),

      cep: z
        .string()
        .regex(
          /^\d{5}-?\d{3}$/,
          "CEP deve ter o formato 00000-000 ou 00000000"
        ),
    }),

    contact: z.object({
      email: z
        .string()
        .email("Email inválido")
        .nonempty("Email não pode estar vazio"),

      phone: z
        .string()
        .regex(
          /^\d{2}\s?(9\d{4}-?\d{4}|\d{4}-?\d{4})$/,
          "Telefone deve ter o formato (11) 99999-9999"
        ),
    }),
  })
  .refine(
    (data) => data.currentCapacity <= data.totalCapacity,
    {
      message:
        "Capacidade atual não pode ser maior que a capacidade total",
      path: ["currentCapacity"],
    }
  );

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

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
  });

  const handleChange = (field: string, value: any) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

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
                ? Number(value) || 0
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
            ? Number(value) || 0
            : value,
      }));
    }
  };

  const validateForm = () => {
    try {
      shelterValidationSchema.parse(form);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          newErrors[path] = err.message;
        });
        setErrors(newErrors);

        const firstError = error.errors[0];
        Alert.alert(
          "Erro de Validação",
          firstError.message
        );
      }
      return false;
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    if (validateForm()) {
      onSubmit(form);
    }

    setIsSubmitting(false);
  };

  const getFieldError = (fieldPath: string) => {
    return errors[fieldPath];
  };

  const hasFieldError = (fieldPath: string) => {
    return !!errors[fieldPath];
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={
        Platform.OS === "ios" ? "padding" : "height"
      }
      keyboardVerticalOffset={
        Platform.OS === "ios" ? 90 : 0
      }>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* Informações Básicas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Informações Básicas
          </Text>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Nome *</Text>
            <TextInput
              style={[
                styles.input,
                hasFieldError("name") && styles.inputError,
              ]}
              value={form.name}
              onChangeText={(text) =>
                handleChange("name", text)
              }
              placeholder="Nome do abrigo"
            />
            {hasFieldError("name") && (
              <Text style={styles.errorText}>
                {getFieldError("name")}
              </Text>
            )}
          </View>

          <View style={styles.row}>
            <View style={styles.halfField}>
              <Text style={styles.label}>
                Capacidade Total
              </Text>
              <TextInput
                style={[
                  styles.input,
                  hasFieldError("totalCapacity") &&
                    styles.inputError,
                ]}
                keyboardType="numeric"
                value={String(form.totalCapacity)}
                onChangeText={(text) =>
                  handleChange("totalCapacity", text)
                }
                placeholder="0"
              />
              {hasFieldError("totalCapacity") && (
                <Text style={styles.errorText}>
                  {getFieldError("totalCapacity")}
                </Text>
              )}
            </View>

            <View style={styles.halfField}>
              <Text style={styles.label}>
                Capacidade Atual
              </Text>
              <TextInput
                style={[
                  styles.input,
                  hasFieldError("currentCapacity") &&
                    styles.inputError,
                ]}
                keyboardType="numeric"
                value={String(form.currentCapacity)}
                onChangeText={(text) =>
                  handleChange("currentCapacity", text)
                }
                placeholder="0"
              />
              {hasFieldError("currentCapacity") && (
                <Text style={styles.errorText}>
                  {getFieldError("currentCapacity")}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Recursos Disponíveis
            </Text>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                hasFieldError("availableResources") &&
                  styles.inputError,
              ]}
              value={form.availableResources}
              onChangeText={(text) =>
                handleChange("availableResources", text)
              }
              placeholder="Ex: Roupas, alimentos, medicamentos..."
              multiline={true}
              numberOfLines={3}
            />
            {hasFieldError("availableResources") && (
              <Text style={styles.errorText}>
                {getFieldError("availableResources")}
              </Text>
            )}
          </View>
        </View>

        {/* Contato */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Informações de Contato
          </Text>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={[
                styles.input,
                hasFieldError("contact.email") &&
                  styles.inputError,
              ]}
              value={form.contact.email}
              onChangeText={(text) =>
                handleChange("contact.email", text)
              }
              placeholder="contato@abrigo.org"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {hasFieldError("contact.email") && (
              <Text style={styles.errorText}>
                {getFieldError("contact.email")}
              </Text>
            )}
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Telefone</Text>
            <TextInput
              style={[
                styles.input,
                hasFieldError("contact.phone") &&
                  styles.inputError,
              ]}
              value={form.contact.phone}
              onChangeText={(text) =>
                handleChange("contact.phone", text)
              }
              placeholder="(11) 99999-9999"
              keyboardType="phone-pad"
            />
            {hasFieldError("contact.phone") && (
              <Text style={styles.errorText}>
                {getFieldError("contact.phone")}
              </Text>
            )}
          </View>
        </View>

        {/* Endereço */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Endereço</Text>

          <View style={styles.row}>
            <View style={[styles.halfField, { flex: 3 }]}>
              <Text style={styles.label}>Rua *</Text>
              <TextInput
                style={[
                  styles.input,
                  hasFieldError("address.street") &&
                    styles.inputError,
                ]}
                value={form.address.street}
                onChangeText={(text) =>
                  handleChange("address.street", text)
                }
                placeholder="Nome da rua"
              />
              {hasFieldError("address.street") && (
                <Text style={styles.errorText}>
                  {getFieldError("address.street")}
                </Text>
              )}
            </View>

            <View style={[styles.halfField, { flex: 1 }]}>
              <Text style={styles.label}>Número</Text>
              <TextInput
                style={[
                  styles.input,
                  hasFieldError("address.number") &&
                    styles.inputError,
                ]}
                keyboardType="numeric"
                value={String(form.address.number)}
                onChangeText={(text) =>
                  handleChange("address.number", text)
                }
                placeholder="123"
              />
              {hasFieldError("address.number") && (
                <Text style={styles.errorText}>
                  {getFieldError("address.number")}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Bairro</Text>
            <TextInput
              style={[
                styles.input,
                hasFieldError("address.district") &&
                  styles.inputError,
              ]}
              value={form.address.district}
              onChangeText={(text) =>
                handleChange("address.district", text)
              }
              placeholder="Nome do bairro"
            />
            {hasFieldError("address.district") && (
              <Text style={styles.errorText}>
                {getFieldError("address.district")}
              </Text>
            )}
          </View>

          <View style={styles.row}>
            <View style={styles.halfField}>
              <Text style={styles.label}>Cidade *</Text>
              <TextInput
                style={[
                  styles.input,
                  hasFieldError("address.city") &&
                    styles.inputError,
                ]}
                value={form.address.city}
                onChangeText={(text) =>
                  handleChange("address.city", text)
                }
                placeholder="Cidade"
              />
              {hasFieldError("address.city") && (
                <Text style={styles.errorText}>
                  {getFieldError("address.city")}
                </Text>
              )}
            </View>

            <View style={styles.halfField}>
              <Text style={styles.label}>Estado</Text>
              <TextInput
                style={[
                  styles.input,
                  hasFieldError("address.state") &&
                    styles.inputError,
                ]}
                value={form.address.state}
                onChangeText={(text) =>
                  handleChange("address.state", text)
                }
                placeholder="São Paulo"
              />
              {hasFieldError("address.state") && (
                <Text style={styles.errorText}>
                  {getFieldError("address.state")}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>CEP</Text>
            <TextInput
              style={[
                styles.input,
                hasFieldError("address.cep") &&
                  styles.inputError,
              ]}
              value={form.address.cep}
              onChangeText={(text) => {
                const formatted = text
                  .replace(/\D/g, "")
                  .replace(/(\d{5})(\d)/, "$1-$2");
                handleChange("address.cep", formatted);
              }}
              placeholder="00000-000"
              keyboardType="numeric"
              maxLength={9}
            />
            {hasFieldError("address.cep") && (
              <Text style={styles.errorText}>
                {getFieldError("address.cep")}
              </Text>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            isSubmitting && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={isSubmitting}>
          <Text style={styles.submitButtonText}>
            {isSubmitting ? "Salvando..." : "Salvar Abrigo"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 30,
  },
  section: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#34495e",
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#ffdb58",
    paddingBottom: 5,
    fontFamily: "Rubik_500Medium",
  },
  fieldContainer: {
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  halfField: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2c3e50",
    marginBottom: 6,
    fontFamily: "Rubik_400Regular",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e1e8ed",
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: "#2c3e50",
    fontFamily: "Rubik_400Regular",
  },
  inputError: {
    borderColor: "#e74c3c",
    borderWidth: 2,
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 12,
    marginTop: 4,
    fontFamily: "Rubik_400Regular",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#ffdb58",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#ffdb58",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  submitButtonDisabled: {
    backgroundColor: "#bdc3c7",
    shadowOpacity: 0.1,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Rubik_500Medium",
  },
});

export default ShelterForm;
