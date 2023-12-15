
import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNamespaces } from "./hooks/useNamespaces"

import { usePods } from "./hooks/usePods"
import { runAll } from "./hooks/runAll"
import { useDeleteAll } from "./hooks/useDeleteAll"
import { patchDeployment } from "@/lib/backend"

import { configGenerator } from "@/lib/configGenerator"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

// Todo: extract components and move them out of this file

export const AuthForm = ({ className, ...props }: UserAuthFormProps) => {

    const { isNSLoading } = useNamespaces()
    const { isPodsLoading, pods } = usePods()
    const localToken = localStorage.getItem("token") || ""
    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        const { username } = event.target as typeof event.target & {
            username: { value: string }
            password: { value: string }
        }
        console.log("username", username.value)

        if (!localStorage.getItem("username")) {
            localStorage.setItem("username", username.value)
        }


    }

    const onSubmitToken = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const { token } = event.target as typeof event.target & {
            token: { value: string }
        }
        console.log("token", token.value)


        if (!localStorage.getItem("token")) {
            localStorage.setItem("token", (token as { value: string }).value)
        }


        runAll()
    }


    const isLoading = React.useMemo(() => isNSLoading || isPodsLoading, [isNSLoading, isPodsLoading])

    const IsOnline = () => {
        return pods?.data.items.length > 0 ? "online" : "offline"
    }

    const ShowConfig = () => {
        const uuid = localStorage.getItem("uuid") || "";
        return pods?.data.items.length > 0 ? <span>{configGenerator(uuid).template}</span> : ''
    }


    const PauseUnPause = () => {
        const toggle = async (replica: 0 | 1) => {
            try {
                await patchDeployment(replica);
            } catch (e) {
                console.log(e);
            }
        }
        if (pods?.data.items.length > 0) {
            return (
                <Button onClick={() => toggle(0)}>Pause</Button>
            )
        } else {
            return (
                <Button onClick={() => toggle(1)}>UnPause</Button>
            )
        }
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Button onClick={useDeleteAll}>Delete All</Button>
            {JSON.stringify(localStorage.getItem("namespace"))}

            <PauseUnPause />

            <ShowConfig />
            <IsOnline />

            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="username">
                            username
                        </Label>
                        <Input
                            id="username"
                            placeholder="username"
                            type="username"
                            autoCapitalize="none"
                            autoComplete="username"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="password">
                            password
                        </Label>
                        <Input
                            id="password"
                            placeholder="password"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="password"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>
                    <Button disabled={isLoading}>
                        {isLoading ? (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )
                            :
                            <span>Login via username and password</span>
                        }
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with token
                    </span>
                </div>
            </div>

            <form onSubmit={onSubmitToken}>
                <div className="grid gap-1">
                    <Label className="sr-only" htmlFor="token">
                        token
                    </Label>
                    <Input
                        id="token"
                        placeholder="token"
                        type="token"
                        autoCapitalize="none"
                        autoComplete="token"
                        autoCorrect="off"
                        defaultValue={localToken}
                        disabled={isLoading}
                    />
                </div>
                <Button variant="outline" type="submit" disabled={isLoading} >
                    {isLoading ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )
                        : <span>
                            Login via token</span>
                    }
                </Button>
            </form>



        </div>
    )
}
