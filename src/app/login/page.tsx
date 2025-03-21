'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/app/contexts/i18n-context';
import Logo from 'public/logo.png';

const formSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(8),
});

export default function Login() {
  const { translations: t } = useI18n();
  const router = useRouter();
  const [hasErrMsg, setHasErrMsg] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const onSubmit = form.handleSubmit(async ({ username, password }) => {
    const csrf = await fetch('/api/auth/csrf').then((res) => res.json());
    const reponse = await signIn('credentials', {
      csrfToken: csrf.csrfToken,
      redirect: false,
      username,
      password,
    });
    setHasErrMsg(!reponse?.ok);
    router.push('/statistics');
  });
  return (
    <Card className="w-120 mx-auto mt-[calc((100vh-var(--spacing)*140)*0.5)] h-128">
      <CardHeader className="justify-center">
        <CardTitle className="mx-auto">
          <Image src={Logo} alt="website logo" className="w-24" />
        </CardTitle>
        <CardDescription className="mx-auto text-2xl">{t.loginPage.title}</CardDescription>
      </CardHeader>
      <CardContent className="grow-1">
        <Form {...form}>
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">{t?.loginPage.usernameLabel}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      className="border-foreground/15"
                      {...field}
                      onChange={(e) => {
                        setHasErrMsg(false);
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <div className="h-5">
                    <FormMessage display={hasErrMsg}>{t?.loginPage.usernameError}</FormMessage>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">{t?.loginPage.passwordLabel}</FormLabel>
                  <FormControl>
                    <Input
                      className="border-foreground/15"
                      placeholder="password"
                      {...field}
                      type="password"
                      onChange={(e) => {
                        setHasErrMsg(false);
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <div className="h-5">
                    <FormMessage display={hasErrMsg}>{t?.loginPage.passwordError}</FormMessage>
                  </div>
                </FormItem>
              )}
            />
            <Button className="w-64 mx-auto" type="submit">
              {t?.loginPage.loginButton}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
