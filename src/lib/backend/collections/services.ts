import { instance, namespace, zone } from ".."

export const createService = async () => {
    return instance.post(`/${zone}/api/v1/namespaces/${namespace}/services`, JSON.stringify({
        "apiVersion": "v1",
        "kind": "Service",
        "metadata": {
            "name": "silkroute"
        },
        "spec": {
            "selector": {
                "app": "silkroute"
            },
            "ports": [
                {
                    "name": "ws",
                    "protocol": "TCP",
                    "port": 8443,
                    "targetPort": 8443
                }
            ]
        }
    }))
}

export const getAllServices = async () => {
    return instance.get(`/${zone}/api/v1/namespaces/${namespace}/services`)
}

export const deleteService = async () => {
    return instance.delete(`/${zone}/api/v1/namespaces/${namespace}/services/silkroute`)
}