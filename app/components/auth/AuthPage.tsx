"use client"
import React from 'react';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { set } from 'date-fns';
import {toast} from "sonner"
import { useSignup } from '@/hooks/auth';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [Loading, setLoading] = useState(false);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');

  // handle signin logic
  const handleSignIn = async (e:React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn('credentials', {email,password,redirect:false})
    setLoading(false);
    if(res?.error){
      alert(res.error);
    }else{
      alert('Sign in success');
      window.location.href = '/';
    } 
  }
  
  const {signupMutation,handleSignup} = useSignup()
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Content Section */}
      <div className="hidden lg:flex flex-col justify-center px-12 bg-slate-50">
        <div className="space-y-6 max-w-lg">
          {isLogin ? (
            <>
              <h1 className="text-4xl font-bold text-slate-900">Welcome back!</h1>
              <p className="text-slate-600 text-lg">
                Log in to your account to access your tasks, manage projects, and stay organized.
                Track your progress and achieve your goals with our powerful task management tools.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-slate-900">Join us today</h1>
              <p className="text-slate-600 text-lg">
                Create an account to start managing your tasks effectively.
                Get access to features like project organization, task tracking, and productivity analytics.
              </p>
            </>
          )}
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Task Management Made Simple</h3>
              <p className="text-slate-600">Organize, track, and complete your tasks efficiently</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Form Section */}
      <div className="flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{isLogin ? 'Sign In' : 'Create Account'}</CardTitle>
            <CardDescription>
              {isLogin 
                ? 'Enter your credentials to access your account' 
                : 'Fill in your details to create a new account'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={isLogin ? handleSignIn : (e) => handleSignup(e,name,email,password)}>
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={name} onChange={(e)=>setName(e.target.value)} required placeholder="Enter your name" />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" value={password} onChange={(e)=>setPassword(e.target.value)} required type="password" placeholder="Enter your password" />
              </div>
              <Button className="w-full" disabled= {signupMutation.isPending}>
               {signupMutation.isPending ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Or continue with</span>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => signIn('google')}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>
            <div className="text-center text-sm text-slate-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:underline font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;


