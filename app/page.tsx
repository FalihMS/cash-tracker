import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PiggyBank } from "lucide-react";

export default function Page() {
    return (
        <div className="w-full min-h-svh flex flex-col justify-center items-center">
            <Card className="w-fit mb-5">
                <CardContent>
                    <PiggyBank className="size-12" />
                </CardContent>
            </Card>
            <h3 className="mb-1 text-center font-bold text-2xl">
                Cash Tracker Application
            </h3>
            <h4 className="mb-3 text-center max-w-xl text-md">
                Track Better. Spend Smarter.
            </h4>
            <div className="space-x-2">
                <Button asChild>
                    <a href="auth/login">
                        Login
                    </a>
                </Button>
                <Button variant={"secondary"} asChild>
                    <a href="#">
                        Register
                    </a>
                </Button>
            </div>
        </div>
    )
}