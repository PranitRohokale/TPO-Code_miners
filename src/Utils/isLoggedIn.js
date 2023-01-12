import { supabase } from "./supabase.config";

export const isLoggedIn = async () => {
    try {
        const { data } = await supabase.auth.getSession()
        if (data)
            return data?.session
    } catch (error) {
        return false
    }
}