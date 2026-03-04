export function MainContent({
    children,
}: Readonly<{
    children?: React.ReactNode;
}>){
    return(
        <main className="w-full max-w-3xl pt-4 p-2 lg:mt-4 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
            {children}
        </main>
    )
}