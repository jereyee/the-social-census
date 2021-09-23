import UpdateName from "components/sign-in/screens/UpdateName";
import React, { useState } from "react";

import * as animationData from "../../../public/lottie/loading_spinner_with_tick.json";
import Lottie from "react-lottie";
import { useRouter } from "next/dist/client/router";
import UpdatePhoto from "components/sign-in/screens/UpdatePhoto";

enum UpdateScreens {
  displayName,
  photo,
  home,
}

const Update = () => {
  const [currentScreen, setCurrentScreen] = useState(UpdateScreens.displayName);

  const successLottieOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const router = useRouter();
  const successCallback = () => {
    window.localStorage.removeItem("isNewUser");
    void router.push("/home");
  };

  switch (currentScreen) {
    case UpdateScreens.displayName:
      return (
        <UpdateName
          successCallback={() => setCurrentScreen(UpdateScreens.photo)}
        />
      );
    case UpdateScreens.photo:
      return (
        <UpdatePhoto
          successCallback={() => setCurrentScreen(UpdateScreens.home)}
        />
      );
    case UpdateScreens.home:
      return (
        <Lottie
          options={successLottieOptions}
          height={200}
          width={200}
          eventListeners={[
            {
              eventName: "complete",
              callback: () => successCallback(),
            },
          ]}
        />
      );
  }
};
export default Update;
