import { getProfile } from "@/features/Profile/onboarding/grapghqLQuery/queryprofile";
import { useQuery } from "@tanstack/react-query";
import { type ReactNode, createContext, useContext } from "react";
import { useAccount } from "wagmi";

type UserProfile = {
  username: string;
  bio: string;
  author: string;
  createdAt: number;
} | null;

type UserContextType = {
  profile: UserProfile;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { address, isConnected } = useAccount();

  const {
    data: profile,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["userProfile", address],
    queryFn: async () => {
      if (!address) return null;
      return await getProfile(address);
    },
    enabled: isConnected && !!address, // Only run when wallet is connected
    staleTime: 1000 * 60 * 10, // 10 minutes - profile rarely changes
    // cacheTime: 1000 * 60 * 30, // Keep in cache 30 min
  });

  return <UserContext.Provider value={{ profile, isLoading, isError, refetch }}>{children}</UserContext.Provider>;
};


export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};