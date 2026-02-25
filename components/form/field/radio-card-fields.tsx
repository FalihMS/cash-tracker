import { Field, FieldContent, FieldDescription, FieldLabel, FieldLegend, FieldSet, FieldTitle } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFieldContext } from "@/hooks/form";

export default function RadioCardField({
    label,
    col,
    options
}: {
    label: string,
    col?: number,
    options: {
        label: string,
        value: string,
        description?: string,
    }[]
}) {
    const field = useFieldContext<string>()
    
    return (
        <FieldSet className="w-full">
            <FieldLegend variant="label">{ label }</FieldLegend>
            <RadioGroup  
                value={field.state.value}
                onValueChange={(v) => {
                    field.handleChange(v)
                }} 
                className={`grid grid-cols-${col ? col : 2}`}
                >
                {
                    options.map(option => (
                        <FieldLabel htmlFor={option.value} key={option.value}>
                            <Field orientation="horizontal">
                                <FieldContent>
                                    <FieldTitle>{option.label}</FieldTitle>
                                    <FieldDescription>
                                        {option.description}
                                    </FieldDescription>
                                </FieldContent>
                                <RadioGroupItem value={option.value} id={option.value} />
                            </Field>
                        </FieldLabel>
                    ))
                }
            </RadioGroup>
        </FieldSet>
    )
}