import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
  return (
    <main className='flex h-screen justify-center items-center w-full'>
      <SignIn />
    </main>
  )
}

export default SignInPage