'use client'
import * as Form from '@radix-ui/react-form'
import { Box, Button, Flex, TextField } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { z, ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

type FormData = {
  email: string
}

export const UserSchema: ZodType<FormData> = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

export const LogInForm: FC = () => {
  const router = useRouter()

  const supabase = createClientComponentClient<any>()

  const handleSignUp = async (email: string) => {
    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    router.refresh()
  }

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(UserSchema),
  })

  const email = watch('email')

  const onSubmit = handleSubmit((data) => handleSignUp(data.email))

  return (
    <Form.Root
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
      onError={(error) => console.error(error)}
    >
      <Form.Field name="email">
        {!!errors.email && (
          <Flex align="baseline" justify="end">
            <Form.Message>{errors.email.message}</Form.Message>
          </Flex>
        )}

        <Form.Control asChild>
          <TextField.Root
            color="gray"
            placeholder="Enter your email"
            radius="medium"
            size="3"
            {...register('email', { required: true })}
          />
        </Form.Control>
      </Form.Field>

      <Box pt="5">
        <Form.Submit asChild>
          <Button
            size="2"
            loading={false}
            style={{
              width: '100%',
            }}
            variant="soft"
            disabled={!email.length}
          >
            Sign in with Magic Link
          </Button>
        </Form.Submit>
      </Box>
    </Form.Root>
  )
}
