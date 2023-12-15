import { instance, namespace, zone } from ".."

export const createDeployment = async () => {
    return instance.post(`/${zone}/apis/apps/v1/namespaces/${namespace}/deployments`, JSON.stringify({
        "apiVersion": "apps/v1",
        "kind": "Deployment",
        "metadata": {
            "name": "silkroute",
            "labels": {
                "app": "silkroute"
            }
        },
        "spec": {
            "replicas": 1,
            "selector": {
                "matchLabels": {
                    "app": "silkroute"
                }
            },
            "template": {
                "metadata": {
                    "labels": {
                        "app": "silkroute"
                    }
                },
                "spec": {
                    "containers": [
                        {
                            "name": "silkroute",
                            "image": "gzxhwq/sing-box:v1.7.4",
                            "env": [
                                {
                                    "name": "CM_VER",
                                    "value": "{{configmap_version}}"
                                }
                            ],
                            "ports": [
                                {
                                    "containerPort": 8443
                                }
                            ],
                            "resources": {
                                "limits": {
                                    "cpu": "100m",
                                    "ephemeral-storage": "200M",
                                    "memory": "200M"
                                },
                                "requests": {
                                    "cpu": "100m",
                                    "ephemeral-storage": "200M",
                                    "memory": "200M"
                                }
                            },
                            "volumeMounts": [
                                {
                                    "name": "config",
                                    "mountPath": "/etc/sing-box/config.json",
                                    "subPath": "config.json"
                                }
                            ]
                        }
                    ],
                    "volumes": [
                        {
                            "name": "config",
                            "configMap": {
                                "name": "config",
                                "items": [
                                    {
                                        "key": "config.json",
                                        "path": "config.json"
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        }
    }))
}

export const patchDeployment = async (replica: 0 | 1) => {
    return instance.patch(`/${zone}/apis/apps/v1/namespaces/${namespace}/deployments/silkroute`, JSON.stringify(
        {
            "spec": {
                "replicas": replica
            }
        }
    ), {
        headers: {
            'Content-Type': 'application/strategic-merge-patch+json',
        },
        maxBodyLength: Infinity,
    })
}

export const deleteDeployment = async () => {
    return instance.delete(`/${zone}/apis/apps/v1/namespaces/${namespace}/deployments/silkroute`)
}
