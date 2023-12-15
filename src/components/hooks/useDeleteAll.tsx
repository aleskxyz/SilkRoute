import { deleteDeployment, deleteIngress, deleteService } from "@/lib/backend"
import { deleteConfigMap } from "@/lib/backend/collections/configmaps";
import { deleteNamespace } from "@/lib/backend/collections/namespaces";

export const useDeleteAll = async () => {


    try {
        await deleteIngress();
    } catch (e) {
        console.log(e);
    }

    try {
        await deleteDeployment();
    } catch (e) {
        console.log(e);
    }
    try {
        await deleteConfigMap();
    } catch (e) {
        console.log(e);
    }
    try {
        await deleteService();
    } catch (e) {
        console.log(e);
    }

    try {
        await deleteNamespace();
    } catch (e) {
        console.log(e);
    }
    localStorage.removeItem("uuid");
}