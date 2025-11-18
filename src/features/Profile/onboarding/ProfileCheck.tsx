import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { getProfile } from "./grapghqLQuery/queryprofile";

const ProfileCheck = () => {
  const { address } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (!address) {
      console.log("User wallet not connected");
      return;
    }
    
    const CheckProfile = async () => {
      const profile = await getProfile(address);

      if (address && !profile) {
        navigate("/onboarding/profile");
      }
    };

    CheckProfile();
  }, [address, navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProfileCheck;
