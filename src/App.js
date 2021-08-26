import React, { useEffect, useRef, useState } from 'react';
import './App.scss';

function App() {
    const [text, setText] = useState('');
    const [wordCount, setWordCount] = useState(0);
    const [characterCount, setCharacterCount] = useState(0);
    const [sentenceCount, setSentenceCount] = useState(0);
    const copiedToClipboardContainer = useRef();
    let typeUpdate = 1;

    let words = text.split(' ');

    let mostUsedWords = [];

    for (let i = 0; i < words.length; i++) {
        const word = words[i];

        if (i === 0 && word !== '') mostUsedWords.push({ word, count: 1 });
        else {
            let doesWordExist = false;

            mostUsedWords.forEach((foundWord) => {
                if (foundWord.word === word) {
                    doesWordExist = true;
                    foundWord.count++;
                }
            });

            if (!doesWordExist && word !== '') {
                mostUsedWords.push({ word, count: 1 });
            }
        }
    }

    function getWordPrecentageOfText(word) {
        return Math.floor((100 / words.length) * word.count);
    }

    function getWordStats(index) {
        let keyword;

        if (index === 0) {
            keyword = '1st:';
        } else if (index === 1) {
            keyword = '2nd:';
        } else if (index === 2) {
            keyword = '3rd:';
        } else {
            keyword = `${index + 1}:`;
        }

        if (mostUsedWords[index] != null) {
            return (
                <>
                    <button onClick={copyStats}>
                        {keyword} {`"${mostUsedWords[index].word}"`}{' '}
                        {mostUsedWords[index].count}{' '}
                        {`${getWordPrecentageOfText(mostUsedWords[index])}%`}
                    </button>
                </>
            );
        }
        return null;
    }

    function changeText(e) {
        setText(e.target.value);

        setWordCount(
            e.target.value === '' || e.target.value == null
                ? 0
                : e.target.value.split(' ').length
        );

        setCharacterCount(
            e.target.value === '' || e.target.value == null
                ? 0
                : e.target.value.length
        );

        setSentenceCount(
            e.target.value === '' || e.target.value == null
                ? 0
                : e.target.value.split('.').length -
                      1 +
                      e.target.value.split('!').length -
                      1 +
                      e.target.value.split('?').length -
                      1
        );

        mostUsedWords.sort(function (a, b) {
            return b.count - a.count;
        });

        console.log(mostUsedWords);
        typeUpdate = !typeUpdate;
    }

    function copyStats(e) {
        navigator.clipboard.writeText(e.target.innerHTML);
        console.log(`Copied "${e.target.innerHTML}"`);

        copiedToClipboardContainer.current.classList.add('open');
        setTimeout(() => {
            copiedToClipboardContainer.current.classList.remove('open');
        }, 1000);
    }

    function flipText() {
        setText(text.split('').reverse().join(''));
    }

    return (
        <div className="App">
            <h1>Shitty Word Counter</h1>
            <textarea
                value={text}
                onChange={changeText}
                placeholder="Type your text here"
                id="textarea"
            ></textarea>
            <div className="controls-container">
                <h2>Controls</h2>
                <label>flip text</label>
                <br />
                <button onClick={flipText}>
                    <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + f
                </button>
            </div>
            <div className="stats-container">
                <button onClick={copyStats}>
                    Character Count: {characterCount}
                </button>
                <button onClick={copyStats}>Word Count: {wordCount}</button>
                <button onClick={copyStats}>
                    Sentence Count: {sentenceCount}
                </button>
            </div>
            <div className="patterns-container">
                <h2>Patterns</h2>
                <br />
                <label>Most Used Words:</label>
                <div className="most-used-words-container" update={typeUpdate}>
                    {console.log(typeUpdate)}
                    {console.log(mostUsedWords)}
                    {getWordStats(0)}
                    {getWordStats(1)}
                    {getWordStats(2)}
                </div>
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
