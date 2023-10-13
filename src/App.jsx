import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
  
  const [length, setLength] = useState("8")
  const [numberAllowed, setNumberAllowed] = useState("false")
  const [characterAllowed, setCharacterAllowed] = useState("false")
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(( ) =>
  {
    let pass =""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(characterAllowed) str += "!@##$%&'()*+,-./"

    for(let i = 0; i < length; i++)
    {
      const index = Math.floor(Math.random() * str.length +1)
      pass += str[index]
    }
    setPassword(pass)

  },[length, setPassword, numberAllowed, characterAllowed]);

  useEffect(()=>{
    passwordGenerator();
  },[length, numberAllowed, characterAllowed, passwordGenerator]);


//copy password
  const passwordRef = useRef(null)
  const copypassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <div className="flex h-screen items-center justify-center">
      
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-7 bg-gray-800 text-orange-500">
        <h1 className="text-white text-3xl text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
          type="text"
          className="w-full outline-none px-3 py-1"
          value={password}
          readOnly
          placeholder="Password" 
          ref={passwordRef}
          />

          <button
          className="outline-none bg-blue-700 px-3 text-white py-0.5 shrink-0"
          onClick={copypassword}>
            copy
          </button>

        </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                  setNumberAllowed((prev) => !prev);
              }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={characterAllowed}
              id="characterInput"
              onChange={() => {
                  setCharacterAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
    </div>
    </div>
  )
}

export default App
