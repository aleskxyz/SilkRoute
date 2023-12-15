import md5 from "md5";
import { namespace, zone } from "./backend";

export const configGenerator = (uuid: string) => {
    const md5HashUUID8_16 = md5(uuid).slice(8, 16);
    const md5HashUUID0_8 = md5(uuid).slice(0, 8);

    const hostname = `${namespace}-${md5HashUUID0_8}.apps.${zone}.arvancaas.ir`

    const path = `/${md5HashUUID8_16}`

    const template = `vless://${uuid}@${hostname}:443/?type=ws&encryption=none&path=${path}&security=tls&alpn=http%2F1.1&fp=chrome#SilkRoute`

    return {
        template,
        md5HashUUID0_8,
        md5HashUUID8_16,
        hostname,
        path
    }
}