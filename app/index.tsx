import { Redirect } from "expo-router";

export default function Index() {
  console.log(" index1 page is active");
  return <Redirect href={"/(auth)/login"} />;
  // return <Redirect href={"/(tabs)"} />;
}
