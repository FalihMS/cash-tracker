import { Button } from "@/components/ui/button";
import { useFormContext } from "@/hooks/form";

export default function SubmitButtonField({
    label,
}: {
    label: string,
}) {
    const form = useFormContext()
    return (
        <form.Subscribe selector={(s) => s.canSubmit}>
            {(canSubmit) => (
                <Button type="submit" form="transaction-form" disabled={!canSubmit}>
                   { label }
                </Button>
            )}
        </form.Subscribe>
    )
}