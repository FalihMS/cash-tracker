import { DatePickerSimple } from "@/components/ui/date-picker";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { useFieldContext } from "@/hooks/form";

export default function TextareaField({
    label,
}: {
    label: string,
    }) {
    const field = useFieldContext<string>()
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
    return (
        <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <InputGroup>
                <InputGroupTextarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Optional notes"
                    rows={4}
                    className="min-h-20 resize-none"
                    aria-invalid={isInvalid}
                />
            </InputGroup>
        </Field>
    )
}