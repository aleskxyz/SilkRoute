import { instance, namespace, zone } from ".."
import { getConfigMap } from "../configMap"

export const createConfigMap = async (uuid: string) => {
    return instance.post(`/${zone}/api/v1/namespaces/${namespace}/configmaps`, JSON.stringify(
        {
            "apiVersion": "v1",
            "kind": "ConfigMap",
            "metadata": {
                "name": "config"
            },
            "data": {
                "config.json": JSON.stringify(getConfigMap(uuid))
            }
        }
    ))
}

export const patchConfigMap = async (uuid: string) => {
    return instance.patch(`/${zone}/api/v1/namespaces/${namespace}/configmaps/config`, JSON.stringify(
        {
            "apiVersion": "v1",
            "kind": "ConfigMap",
            "metadata": {
                "name": "config"
            },
            "data": {
                "config.json": JSON.stringify(getConfigMap(uuid))
            }
        }
    ), {
        headers: {
            'Content-Type': 'application/strategic-merge-patch+json',
        },
        maxBodyLength: Infinity,
    })
}


export const getAllConfigMaps = async () => {
    return instance.get(`/${zone}/api/v1/namespaces/${namespace}/configmaps`)
}

export const deleteConfigMap = async () => {
    return instance.delete(`/${zone}/api/v1/namespaces/${namespace}/configmaps/config`)
}