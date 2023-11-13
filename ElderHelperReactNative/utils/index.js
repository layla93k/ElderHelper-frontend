import { Platform } from "react-native";
import { io } from "socket.io-client";

export const BaseURL =
  Platform.OS === "android" ? "http//10.0.2.2:3000" : "http//10.0.2.2:3000";

export const socket = io.connect("http//10.0.2.2:9090");
