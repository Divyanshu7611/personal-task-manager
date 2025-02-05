import { useEffect } from "react";
import { getToken } from "next-auth/jwt";
import { useRouter } from "next/router";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const token = await getToken({ req: props.req });
        if (!token) {
          router.push("/login");
        }
      };

      checkAuth();
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;