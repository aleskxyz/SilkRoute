
import { getPods } from "@/lib/backend"
import useSWR from "swr"

export const usePods = () => {
    const { data, error, isLoading, mutate } = useSWR(`/pods`, getPods, {
        revalidateOnFocus: false,
        revalidateOnMount: false,
        revalidateOnReconnect: false,
        refreshWhenOffline: false,
        refreshWhenHidden: false,
        refreshInterval: 5000,
    })

    return {
        pods: data,
        isPodsLoading: isLoading,
        isPodsError: error,
        fetchPods: mutate,
    }
}