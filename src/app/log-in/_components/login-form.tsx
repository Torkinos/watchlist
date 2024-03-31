'use client'

import * as Form from '@radix-ui/react-form'
import { Box, Button, Flex, TextField } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FC, useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z, ZodType } from 'zod'
import { signinAction, SigninFormData } from '~/actions/sign-in'
import { FadeIn } from '~/components/fade-in'

export const SigninSchema: ZodType<SigninFormData> = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

export const LogInForm: FC = () => {
  const [isPending, startTransition] = useTransition()

  const {
    register,
    watch,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SigninFormData>({
    defaultValues: {
      email: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(SigninSchema),
  })

  const email = watch('email')

  const onSubmit: SubmitHandler<SigninFormData> = (data) =>
    startTransition(async () => {
      const response = await signinAction(
        data,
        `${location.origin}/auth/callback`
      )

      if (response?.errors.email) {
        setError('email', { message: response.errors.email })
      }
    })

  return (
    <FadeIn>
      <Form.Root
        onSubmit={handleSubmit(onSubmit)}
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
              loading={isPending}
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
    </FadeIn>
  )
}
