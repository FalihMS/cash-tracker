import DateField from "@/components/form/field/date-fields";
import RadioCardField from "@/components/form/field/radio-card-fields";
import SelectField from "@/components/form/field/select-fields";
import SubmitButtonField from "@/components/form/field/submit-button-fields";
import TextareaField from "@/components/form/field/text-area-fields";
import TextNumberField from "@/components/form/field/text-number-fields";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    DateField: DateField,
    TextareaField: TextareaField,
    TextNumberField: TextNumberField,
    SelectField: SelectField,
    RadioCardField: RadioCardField,
  },
  formComponents: {
    SubmitButtonField: SubmitButtonField,
  },
});

export type UseAppForm = ReturnType<typeof useAppForm>;