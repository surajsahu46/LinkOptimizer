import { ChangePasswordForm } from "@/components";

export const metadata = {
    title: "Change Password | LinkOptimizer",
}

export default function ChangePasswordPage() {
    return (
        <main className="w-full min-h-[calc(100vh-80px)] flex justify-center items-center p-6 pb-12">
            <section className="w-full max-w-[1024px] flex flex-col items-center">
                <article>
                    <ChangePasswordForm />
                </article>
            </section>
        </main>
    )
}
