import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://bfhl-api-y36s.onrender.com/';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      const parsedInput = JSON.parse(input);
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        throw new Error('Invalid input format');
      }
      const res = await axios.post(API_URL, parsedInput);
      setResponse(res.data);
    } catch (err) {
      setError(err.message || 'Invalid JSON or API error');
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    const selectedData = {};
    if (selectedOptions.includes('Alphabets')) selectedData.alphabets = response.alphabets;
    if (selectedOptions.includes('Numbers')) selectedData.numbers = response.numbers;
    if (selectedOptions.includes('Highest lowercase alphabet')) selectedData.highest_lowercase_alphabet = response.highest_lowercase_alphabet;

    return (
      <pre>{JSON.stringify(selectedData, null, 2)}</pre>
    );
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>21BEC2015</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON input (e.g., {"data": ["A","1","B","2"]})'
          style={{ width: '100%', height: '100px', marginBottom: '10px', padding: '5px' }}
        />
        <button type="submit" style={{ display: 'block', width: '100%', padding: '10px' }}>Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div>
          <h2>Select data to display:</h2>
          <select
            multiple
            value={selectedOptions}
            onChange={(e) => setSelectedOptions(Array.from(e.target.selectedOptions, option => option.value))}
            style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
          >
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
          <h2>Response:</h2>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;