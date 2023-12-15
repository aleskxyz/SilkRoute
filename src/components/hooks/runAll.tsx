import { createDeployment, createIngress, createService, namespace, patchDeployment } from "@/lib/backend"
import { createConfigMap } from "@/lib/backend/collections/configmaps";
import { createNamespace, getAllNamespaces } from "@/lib/backend/collections/namespaces"
import { TNameSpace } from "@/lib/types";

// Todo: create check for each step (check if exists, if not create, if exists, patch)
// Todo: use resourceVersion from configmap response for next steps

export const runAll = async () => {

    let uuid = '';

    try {
        const get_namespace_res = await getAllNamespaces()
        if (get_namespace_res?.data.items.length > 0) {
            uuid = get_namespace_res.data.items.find((item: TNameSpace) => item.metadata.name === namespace).metadata.uid;
            localStorage.setItem("uuid", uuid);
        }
    } catch (e) {


        try {
            const cns_res = await createNamespace();
            console.log({ cns_res });

            uuid = cns_res.data.metadata.uid;
            alert("uuid: " + uuid)
            console.log({uuid})
            localStorage.setItem("uuid", uuid);


        } catch (e) {
            console.log(e);
        }


    }
    setTimeout(async () => {


        try {
            const res_configmap_create = await createConfigMap(uuid);
            console.log({res_configmap_create})
        } catch (e) {
            console.log(e);
        }

        try {
            await createService();
        } catch (e) {
            console.log(e);
        }

       

        try {
            await createDeployment();
        } catch (e) {
            console.log(e);
        }

        try {
            await createIngress(uuid);
        } catch (e) {
            console.log(e);
        }

        try {
            await patchDeployment(1);
        } catch (e) {
            console.log(e);
        }



        console.log('Finished!');
    }, 1);
}