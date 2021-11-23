import { ReactNode } from "react";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

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