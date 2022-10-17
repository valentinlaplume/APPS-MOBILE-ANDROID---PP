import { CapacitorConfig } from '@capacitor/cli';

// const config: CapacitorConfig = {
//   appId: 'io.ionic.starter',
//   appName: 'app-ionic',
//   webDir: 'www',
//   bundledWebRuntime: false
// };

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: /*'app-ionic'*/'conversandoAula',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: true,
      backgroundColor: "#000000",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true,
    },
  },
};

export default config;
