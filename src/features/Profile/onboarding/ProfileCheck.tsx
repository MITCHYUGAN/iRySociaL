import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

const ProfileCheck = () => {
  const { isConnected, isDisconnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      navigate("/onboarding/profile");
    }
  }, [isConnected, navigate]);

  return (<div>
    {/* { isDisconnected && } */}
    <Outlet />
  </div>);
};

export default ProfileCheck;
