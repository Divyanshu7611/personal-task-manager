export const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token"); // Adjust as needed
    }
    return null;
  };
  