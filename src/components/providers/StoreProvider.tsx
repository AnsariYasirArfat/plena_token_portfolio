import { type AppStore, makeStore } from "@/store/store";
import { useRef, type ReactNode } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
