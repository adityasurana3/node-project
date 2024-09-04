import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button";
import { BottomWarning } from "../components/ButtomWarning";
import { useState } from "react";


export const Signin = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  return <div className="bg-slate-300 h-screen flex justify-center">
  <div className="flex flex-col justify-center">
    <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
      <Heading label={"Sign in"} />
      <SubHeading label={"Enter your credentials to access your account"} />
      <InputBox onChange={e=>setUsername(e.target.value)} placeholder="aditya@gmail.com" label={"Email"} />
      <InputBox onChange={e=>{setPassword(e.target.value)}} placeholder="123456" label={"Password"} />
      <div className="pt-4">
        <Button label={"Sign in"} onClick={() => {
          
        }}/>
      </div>
      <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
    </div>
  </div>
</div>
}