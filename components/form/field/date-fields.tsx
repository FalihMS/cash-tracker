import { DatePickerSimple } from "@/components/ui/date-picker";
import { Field, FieldLabel } from "@/components/ui/field";
import { useFieldContext } from "@/hooks/form";

export default function DateField({
    label,
}: {
    label: string,
}) {
    const field = useFieldContext<string>()
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

    return (
        <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <DatePickerSimple
                selected={field.state.value}
                onSelect={(d) => field.handleChange(d)}
            />
        </Field>
    )
}