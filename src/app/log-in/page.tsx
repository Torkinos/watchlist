import { NextPage } from 'next'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { permanentRedirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { Box, Flex, Text } from '@radix-ui/themes'
import { Database } from 'src/__generated__/supabase'
import { Logo } from '~/components/logo'
import { LogInForm } from './_components/login-form'

const LogIn: NextPage = async () => {
  const cookieStore = cookies()

  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })

  const { data } = await supabase.auth.getUser()

  if (data.user) {
    permanentRedirect('/dashboard')
  }

  return (
    <main>
      <Flex
        width="100vw"
        height="100vh"
        direction="column"
        justify="center"
        align="center"
      >
        <Box
          pb={{
            initial: '0',
            md: '15vh',
          }}
          width={{
            initial: '100%',
            xs: '400px',
          }}
        >
          <Box p="6">
            <Box pt="6">
              <Logo size="large" headingAs="h1" />
            </Box>

            <Box p="6"></Box>

            <LogInForm />
          </Box>

          <Box py="4" px="6">
            <Text as="p" size="3" align="center" color="gray">
              {/* TODO: fix color */}
              Who needs a social life when there are so many things to watch?
            </Text>
          </Box>
        </Box>
      </Flex>
    </main>
  )
}

export default LogIn
