import React, { useEffect, useState } from "react"
import "./App.css"

function App() {
  const [count, setCount] = useState(0)
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  })
  useEffect(() => {
    document.title = count
  })
  const onresize = () => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    })
  }
  useEffect(() => {
    window.addEventListener("resize", onresize, false)
    console.log("111")
    return () => {
      window.removeEventListener("resize", onresize, false)
    }
  }, [])
  const onclick=()=>{
    console.log('click')
  }
  useEffect(()=>{
    document.getElementById('xxx').addEventListener('click',onclick,false)
    return ()=>{
      document.getElementById('xxx').removeEventListener('click',onclick,false)
    }
  })
  return (
    <div>
      {count}
      <br />
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        点击
      </button>
      {count % 2 ? (
        <span id='xxx'>
          size:{size.width}*{size.height}
        </span>
      ) : (
        <p id='xxx'>我是xxx</p>
      )}
    </div>
  )
}

export default App
