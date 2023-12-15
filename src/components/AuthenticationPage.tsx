
import { AuthForm } from "./AuthForm"


export default function AuthenticationPage() {
    return (
        <>
            <div className="container relative min-h-[calc(100vh-70px)] flex-col items-center justify-center sm:grid sm:max-w-none sm:grid-cols-2 sm:px-0">



                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">

                    <AuthForm />

                </div>
            </div>

        </>
    )
}