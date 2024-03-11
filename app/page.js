'use client'
import { useCallback, useEffect, useRef, useState } from "react";

export default function Home() {

  const [password, setPassword] = useState('')
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerators = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numbers) {
      str += "0123456789"
    }
    if (charAllowed) {
      str += "!@#$.<>?/"
    }

    for (let i = 1; i <= length; i++) {
      const response = Math.floor((Math.random() * str.length + 1));
      pass += str.charAt(response)

    }

    setPassword(pass)

  },
    [length, numbers, charAllowed])

    const onCopyHandler = useCallback(()=>{
      passwordRef.current?.select()
      window.navigator.clipboard.writeText(password)
      alert("password copied")
    },[password])

  useEffect(() => {
    passwordGenerators()
  }, [length, numbers, charAllowed])


  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 mb-3 bg-gray-700">
        <h1 className="text-White text-center py-4 ">Password Generators</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
          type="text" 
          value={password} 
          readOnly
           className="outline-none w-full py-1 px-3 bg-white" 
           ref={passwordRef}
           />
          <button 
          onClick={onCopyHandler}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={30}
              value={length}
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label htmlFor="lengthInput">Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              value={numbers}
              onChange={() => setNumbers((prev) => !prev)}
            />
            <label htmlFor="numbersInput"> Numbers</label>

          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              value={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="CharacterInput"> Char</label>

          </div>
        </div>
      </div>
    </>
  );
}
