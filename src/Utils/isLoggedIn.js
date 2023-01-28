import { supabase } from "./supabase.config";


export const isLoggedIn = async () => {
    try {
        const { data, error } = await supabase.auth.getSession()

        if (error)
            return { error: true, isAuth: false }

        const userId = data?.session?.user?.id
        let userRole = data?.session?.user?.user_metadata?.role?.toLowerCase();

        return { userId, userRole, isAuth: true }
    } catch (error) {
        return { error: true, isAuth: false }
    }
}