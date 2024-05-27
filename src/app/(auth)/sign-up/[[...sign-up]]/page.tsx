import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <main className='flex h-screen justify-center items-center w-full'>
      <SignUp />
    </main>
  )
}

export default SignUpPage;