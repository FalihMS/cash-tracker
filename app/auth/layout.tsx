import { Card, CardContent } from "@/components/ui/card";
import { PiggyBank } from "lucide-react";

export default async function RouteAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return(
      <div className="w-full min-h-svh mt-10 flex flex-col items-center">
        <Card className="w-fit mb-10">
          <CardContent>
            <PiggyBank className="size-12" />
          </CardContent>
        </Card>
        { children }
      </div>
    )
}