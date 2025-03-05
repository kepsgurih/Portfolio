"use server"
import { createClient } from "@/utils/supabase/server"

export const getAllProject = async () => {
    const supabase = await createClient()
    const { data: project } = await supabase.from('Projects').select('*')
    return project || []
}

export const getAllProjectLimit3 = async () => {
    const supabase = await createClient()
    const { data: project } = await supabase.from('Projects').select('*').limit(3)

    console.log(project)
    return project || []
}