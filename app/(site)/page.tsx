import AuthForm from '@/app/(site)/components/auth-form'
import Image from 'next/image'

export default function Home() {
  return (
    <section className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100 min-h-full">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="logo"
          src="/logo.png"
          width={48}
          height={48}
          className="mx-auto w-auto"
        />
        <h2 className="mt-6 font-bold text-center text-xl md:text-2xl lg:text-3xl tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </section>
  )
}
