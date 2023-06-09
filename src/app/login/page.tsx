import { Login, SignUp } from "@/components/AuthPages";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nowted - Login",
};

export default function page() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <Tabs defaultValue="signin">
          <TabsList className="grid w-full grid-cols-2 bg-white/[5%]">
            <TabsTrigger value="signin">Sigh in</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Card className="w-[400px] bg-white/[3%] text-white border border-white/[5%]">
              <CardHeader className="text-[32px] font-semibold text-center">
                Sign In
              </CardHeader>
              <CardContent className="flex flex-col gap-[20px]">
                <Login />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card className="w-[400px] bg-white/[3%] text-white border border-white/[5%]">
              <CardHeader className="text-[32px] font-semibold text-center">
                Sign Up
              </CardHeader>
              <CardContent className="flex flex-col gap-[20px]">
                <SignUp />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
