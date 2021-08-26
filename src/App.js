import React, { useEffect, useRef, useState } from "react";
import "./App.scss";

function App() {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const copiedToClipboardContainer = useRef();

  function changeText(e) {
    setText(e.target.value);

    setWordCount(
      e.target.value === "" || e.target.value == null
        ? 0
        : e.target.value.split(" ").length
    );

    setCharacterCount(
      e.target.value === "" || e.target.value == null
        ? 0
        : e.target.value.length
    );

    setSentenceCount(
      e.target.value === "" || e.target.value == null
        ? 0
        : e.target.value.split(".").length - 1
    );
  }

  function copyStats(e) {
    navigator.clipboard.writeText(e.target.innerHTML);
    console.log(`Copied "${e.target.innerHTML}"`);

    copiedToClipboardContainer.current.classList.add("open");
    setTimeout(() => {
      copiedToClipboardContainer.current.classList.remove("open");
    }, 1000);
  }

  return (
    <div className="App">
      <h1>Very Good(Shitty) Word Counter</h1>
      <textarea
        value={text}
        onChange={changeText}
        placeholder="Type your text here"
        id="textarea"
      ></textarea>
      <div className="stats-container">
        <button onClick={copyStats}>Character Count: {characterCount}</button>
        <button onClick={copyStats}>Word Count: {wordCount}</button>
        <button onClick={copyStats}>Sentence Count: {sentenceCount}</button>
      </div>
      <div
        ref={copiedToClipboardContainer}
        className="copied-to-clipboard-container"
      >
        <label>Copied to clipboard!</label>
      </div>
    </div>
  );
}

export default App;
