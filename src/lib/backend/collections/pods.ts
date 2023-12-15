import { instance, namespace, zone } from "../config"

export const getPods = async () => {
    return instance.get(`/${zone}/apis/metrics.k8s.io/v1beta1/namespaces/${namespace}/pods`)
}