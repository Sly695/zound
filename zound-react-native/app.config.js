// Importation de dotenv pour charger les variables d'environnement
import 'dotenv/config';

export default {
  expo: {
    name: "zound",
    slug: "zound",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.yourcompany.yourappname",
      infoPlist: {
        NSCameraUsageDescription: "Your camera usage description",
        NSPhotoLibraryUsageDescription: "Your photo library usage description",
        NSPhotoLibraryAddUsageDescription: "Your photo library add usage description"
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      permissions: [
        "android.permission.BLUETOOTH",
        "android.permission.BLUETOOTH_ADMIN",
        "android.permission.BLUETOOTH_CONNECT"
      ],
      package: "com.zound.app"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      ["react-native-ble-plx", {
        isBackgroundEnabled: true,
        modes: ["peripheral", "central"],
        bluetoothAlwaysPermission: "Allow ${PRODUCT_NAME} to connect to bluetooth devices"
      }]
    ],
    // Exemple d'ajout d'une variable d'environnement
    extra: {
      "eas" : {
        "projectId": "0835c33f-56fb-4da2-b210-f43ce60577f3"
      },
      apiUrl: process.env.EXPO_PUBLIC_API_URL, // Charger l'URL depuis .env
    },
  },
};
