import { SidebarTrigger } from "./ui/sidebar";

export function MainContent({
    children,
    title
}: {
    children?: React.ReactNode,
    title?: string
}){
    return(
        <>
            <nav className="md:hidden h-12 ml-2 flex justify-between items-center">
                <SidebarTrigger className="p-4" />
                <h3 className="font-medium">{title}</h3>
                <SidebarTrigger className="invisible p-4" />
            </nav>
            <main className="w-full max-w-3xl p-4 md:mt-4 mx-auto grid grid-cols-1 gap-4">
                <h3 className="hidden md:block font-medium text-2xl mb-2">{title}</h3>
                {children}
            </main>
        </>
    )
}