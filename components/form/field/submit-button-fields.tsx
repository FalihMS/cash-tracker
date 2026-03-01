import { Button } from "@/components/ui/button";
import { useFormContext } from "@/hooks/form";

export default function SubmitButtonField({
    form,
    label,
}: {
    form: string,
    label: string,
}) {
    const formContext = useFormContext()
    return (
        <formContext.Subscribe selector={(s) => s.canSubmit}>
            {(canSubmit) => (
                <Button type="submit" form={form} disabled={!canSubmit}>
                   { label }
                </Button>
            )}
        </formContext.Subscribe>
    )
}