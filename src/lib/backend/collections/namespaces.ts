import { instance, namespace, zone } from "../config"

export const getAllNamespaces = async () => {
    return instance.get(`/${zone}/api/v1/namespaces`)
}

export const createNamespace = async (name = namespace) => {
    return instance.post(`/${zone}/api/v1/namespaces`,
        JSON.stringify({
            "apiVersion": "v1",
            "kind": "Namespace",
            "metadata": {
                "name": name
            }
        })
    )
}

export const deleteNamespace = async () => {
    return instance.delete(`/${zone}/api/v1/namespaces/${namespace}`)
}