import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { getProfile } from "./grapghqLQuery/queryprofile";
// import { useParams } from "react-router-dom";

const ProfileCheck = () => {
  const { address } = useAccount();
  const navigate = useNavigate();
  // const params = useParams();
  // const currentUsername = params.username;

  useEffect(() => {
    if (!address) {
      console.log("User wallet not connected");
      return;
    }

    const CheckProfile = async () => {
      try {
        const profile = await getProfile(address);

        if (address && !profile) {
          navigate("/onboarding/profile");
        }
      } catch (error) {
        console.error("Error while fetching profile", error);
      }
      ///. ========= Login to reload profile page on wallet change.
      // if (address && profile) {
      //   console.log("Profilesssyy", profile);

      //   if (window.location.pathname.startsWith("/profile")) {
      //     if (currentUsername !== profile.username) {
      //       navigate(`/profile/${profile.username}`);
      //     }
      //     console.log("YEESEESES");
      //   }
      // }
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
