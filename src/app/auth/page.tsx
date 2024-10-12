import { 
    ModeToggle, 
    SigninForm, 
    SignupForm, 
    Tabs, 
    TabsContent, 
    TabsList, 
    TabsTrigger, 
    Tooltip, 
    TooltipContent, 
    TooltipProvider, 
    TooltipTrigger 
} from "@/components";
import { Home } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Authentication | LinkOptimizer',
};

export default function AuthPage({ searchParams }: { searchParams: { [key: string]: string } }) {
    const { mode } = searchParams;

    return (
        <main className="flex w-full min-h-screen flex-col items-center justify-between pt-20 sm:pt-16 p-16">
            {/* Navigation and Theme Toggle */}
            <div className="absolute top-5 right-5 flex gap-1.5 items-center">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link 
                                href="/" 
                                className="overflow-hidden relative size-10 rounded-md bg-primary hover:bg-primary/90 flex items-center justify-center text-LinkOptimizer-primary"
                            >
                                <Home size={19} />
                                <span className="absolute -left-1/2 pointer-events-none size-0">Go to home</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Go to home</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <ModeToggle />
            </div>

            {/* Authentication Tabs */}
            <section>
                <Tabs defaultValue={mode || "signin"} className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2 bg-LinkOptimizer-secondary text-LinkOptimizer-primary">
                        <TabsTrigger value="signin">Sign In</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="signin">
                        <h2 className="font-bold text-[35px] text-center my-6 text-foreground">Enter your account</h2>
                        <SigninForm />
                    </TabsContent>
                    <TabsContent value="signup">
                        <h2 className="font-bold text-[35px] text-center my-6 text-foreground">Create your account</h2>
                        <SignupForm />
                    </TabsContent>
                </Tabs>
            </section>
        </main>
    );
}
