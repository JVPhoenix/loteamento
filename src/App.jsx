import React from "react";
import MainRoutes from "./components/routes/MainRoutes";

export default function App() {
  // function scroll(id) {
  //   const element = document.getElementById(id)
  //   element.scrollIntoView(true)
  //   setTimeout(() => {
  //     window.scrollBy(0, -105)
  //   }, 700)
  // }

  return (
    <main>
      <MainRoutes />
    </main>
  );
}
