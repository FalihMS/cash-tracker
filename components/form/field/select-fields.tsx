import { Field, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFieldContext } from "@/hooks/form";

export default function SelectField({
    label,
    options
}: {
    label: string,
    options:{
        label: string,
        value: string,
    }[]
}) {
    const field = useFieldContext<string>()
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
    return (
        <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name}>{ label }</FieldLabel>
            <Select value={field.state.value} onValueChange={(v) => field.handleChange(v)}>
                <SelectTrigger aria-invalid={isInvalid} aria-label="Type" className="w-full">
                    <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent position="popper">
                    {
                        options.map(option => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem> )
                    }
                </SelectContent>
            </Select>
        </Field>
    )
}