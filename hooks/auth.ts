import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { registerUser } from "@/actions/auth/Signup";
import { loginUser } from "@/actions/auth/Login";
import { useAuthStore } from "@/store/useAuthStore";


export function useSignup() {
  const signupMutation = useMutation({
    mutationFn: async ({ name, email, password }: { name: string; email: string; password: string }) => {
      return registerUser(name, email, password);
    },
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.success);
      }
    },
    onError: () => {
      toast.error("Signup failed. Try again.");
    },
  });

  const handleSignup = async (
    e: React.FormEvent,
    name: string,
    email: string,
    password: string
  ) => {
    e.preventDefault();
    
    signupMutation.mutate(
      { name, email, password }, // Pass user details to mutate
      {
        onSuccess: (data) => {
          if (data.success) {
         
            toast.success(data.success);
          }
        },
      }
    );
  };

  return { handleSignup, signupMutation };
}



// login


export function useSignin() {
  const {setUser,setIsAuthenticated,setLoading} = useAuthStore();
  const signinMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      return loginUser(email, password);
    },
    onSuccess: (data) => {
      setLoading(true)
      if (data.error) {
        toast.error(data.error);
      } else {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        setUser(
          { id: data?.user?.id?.toString() || '', name: data?.user?.name, email: data?.user?.email },
         data.token?.toString() || ''
        );
        document.cookie = `token=${data.token}; path=/; secure; HttpOnly`;
        console.log(data)
        toast.success(data.success);
        window.location.href = "/dashboard";
      }
    },
    onError: () => {
      toast.error("login failed. Try again.");
    },
  });

  const handleSignin = async (
    e: React.FormEvent,
    email: string,
    password: string
  ) => {
   
    e.preventDefault();
    signinMutation.mutate(
      {email, password },
      {
        onSuccess: (data) => {
          if (data.success) {
            toast.success(data.success);
          }
        },
      }
    );
  };

  return { handleSignin, signinMutation };
}
