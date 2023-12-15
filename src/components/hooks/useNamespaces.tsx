import { getAllNamespaces } from "@/lib/backend/collections/namespaces"
import useSWR from "swr"

export const useNamespaces = () => {
    const { data, error, isLoading, mutate } = useSWR(`/namespaces`, getAllNamespaces, {
        revalidateOnFocus: false,
        revalidateOnMount: false,
        revalidateOnReconnect: false,
        refreshWhenOffline: false,
        refreshWhenHidden: false,
        refreshInterval: 0,
    })

    return {
        namespaces: data,
        isNSLoading: isLoading,
        isNSError: error,
        fetchNS: mutate,
    }
}