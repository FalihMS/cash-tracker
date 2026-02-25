import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFieldContext } from "@/hooks/form";
import { formatCurrencyDisplay, formatCurrencyValue } from "@/lib/utils";

export default function TextNumberField({
    label,
}: {
    label: string,
}) {
    const field = useFieldContext<number>()
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
    return (
        <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <Input
                id={field.name}
                name={field.name}
                value={formatCurrencyDisplay(field.state.value)}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(formatCurrencyValue(e.target.value))}
                aria-invalid={isInvalid}
                placeholder="0"
            />
        </Field>
    )
}