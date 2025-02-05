import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { registerUser } from "@/actions/auth/Signup";

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
