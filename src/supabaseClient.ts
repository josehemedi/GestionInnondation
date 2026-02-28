import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://yxudokcswqagipotblfj.supabase.co"

const supabaseKey = "sb_publishable_SbHiVgiNUeHEhzUSA1s7kw_oKABBJ2_"

export const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase