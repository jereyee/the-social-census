import { createContext, useContext, useEffect, useState } from "react";
import { User, getAuth } from "firebase/auth";
import nookies from "nookies";

const AuthContext = createContext<{ user: User | null }>({
  user: null,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);

  // listen for token changes
  // call setUser and write new token as a cookie
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    return getAuth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, "token", "", { path: "/" });
      } else {
        const token = await user.getIdToken();
        setUser(user);
        nookies.set(undefined, "token", token, { path: "/" });
      }
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const handle = setInterval(async () => {
      const user = getAuth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
