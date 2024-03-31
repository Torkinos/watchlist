'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from 'src/__generated__/supabase'

export type SigninFormData = {
  email: string
}

const handleSignin = async (email: string, redirectPath: string) => {
  const supabase = createServerActionClient<Database>({
    cookies: () => cookies(),
  })

  await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectPath,
    },
  })
}

export const signinAction = async (
  data: SigninFormData,
  redirectPath: string
) => {
  try {
    await handleSignin(data.email, redirectPath)
  } catch (error) {
    return {
      errors: {
        email: 'An error occurred while signing up. Please try again.',
      },
    }
  }
}
