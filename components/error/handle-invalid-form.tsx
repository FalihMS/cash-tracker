export default function PrintError({ errMessage }: { errMessage: string[] }) {
    return (
        <ul className="list-disc pl-4">
            {errMessage.map((err, i) => (
                <li key={i}>{err}</li>
            ))}
        </ul>
    )
}