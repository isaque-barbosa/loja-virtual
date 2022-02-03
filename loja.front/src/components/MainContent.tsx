import { ReactNode } from "react";

import { Header } from "./Header";
import { Footer } from "./Footer";

type MainContentProps = {
    children: ReactNode
};

export function MainContent(props: MainContentProps) {
  return (
    <>
      <Header />
        {props.children}
      <Footer />
    </>
  );
}