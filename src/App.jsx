import {useState} from "react";
import RegisterFormik from "./components/forms/RegisterFormik";
import RegisterHook from "./components/forms/RegisterHook";

function App() {
  return (
    <div className="App">
      {/* <RegisterFormik></RegisterFormik> */}
      <RegisterHook></RegisterHook>
    </div>
  );
}

export default App;
