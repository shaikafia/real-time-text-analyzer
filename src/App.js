import React, { useState } from 'react';
import './App.css';

function TextAnalyzer() {
  const [text, setText] = useState('');
  const [searchString, setSearchString] = useState('');
  const [replaceString, setReplaceString] = useState('');
  const [highlightedText, setHighlightedText] = useState('');

  // Function to count unique words (case-insensitive)
  const countUniqueWords = (inputText) => {
    const words = inputText.toLowerCase().match(/\b\w+\b/g) || [];
    const uniqueWords = new Set(words);
    return uniqueWords.size;
  };

  // Function to count characters excluding spaces and punctuation
  const countValidCharacters = (inputText) => {
    const characters = inputText.replace(/[^a-zA-Z0-9]/g, '');
    return characters.length;
  };

  // Handle textarea input change and update statistics
  const handleTextChange = (event) => {
    const inputText = event.target.value;
    setText(inputText);
    setHighlightedText(inputText); // Initially no highlight
  };

  // Handle string replacement
  const handleReplace = () => {
    const replacedText = text.replaceAll(searchString, replaceString);
    setText(replacedText);

    // Highlight replaced text (Bonus)
    const regex = new RegExp(`(${replaceString})`, 'g');
    const highlighted = replacedText.replace(regex, '<mark>$1</mark>');
    setHighlightedText(highlighted);
  };

  return (
    <div className="container">
      <h1>Real-Time Text Analyzer & String Replacer</h1>
      
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Type or paste your text here..."
      />
      
      <div className="stats">
        <p>Unique Word Count: {countUniqueWords(text)}</p>
        <p>Character Count (Excluding Spaces and Punctuation): {countValidCharacters(text)}</p>
      </div>

      <div className="replacement-section">
        <input
          type="text"
          placeholder="Search string"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
        <input
          type="text"
          placeholder="Replace with"
          value={replaceString}
          onChange={(e) => setReplaceString(e.target.value)}
        />
        <button onClick={handleReplace}>Replace All</button>
      </div>

      <div className="highlighted-text">
        <h2>Text Preview:</h2>
        <div dangerouslySetInnerHTML={{ __html: highlightedText }} />
      </div>
    </div>
  );
}

export default TextAnalyzer;

