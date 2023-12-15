import { configGenerator } from "@/lib/configGenerator";
import { instance, namespace, zone } from ".."

export const createIngress = (uuid: string) => {
    const hostname = configGenerator(uuid).hostname
    return instance.post(`/${zone}/apis/networking.k8s.io/v1/namespaces/${namespace}/ingresses`, JSON.stringify(
        {
            "apiVersion": "networking.k8s.io/v1",
            "kind": "Ingress",
            "metadata": {
                "name": namespace
            },
            "spec": {
                "ingressClassName": "nginx",
                "rules": [
                    {
                        "host": hostname,
                        "http": {
                            "paths": [
                                {
                                    "path": "/",
                                    "pathType": "Prefix",
                                    "backend": {
                                        "service": {
                                            "name": namespace,
                                            "port": {
                                                "name": "ws"
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ))
}

export const deleteIngress = () => {
    return instance.delete(`/${zone}/apis/networking.k8s.io/v1/namespaces/${namespace}/ingresses/silkroute`)
}   