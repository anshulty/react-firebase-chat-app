// src/App.js

// Import React library
import React from 'react';
// Import the Chat component
import Chat from './components/Chat';

// Define the App component
function App() {
  return (
    // Render the Chat component inside a div with the className "App"
    <div className="App">
      <Chat />
    </div>
  );
}

// Export the App component as the default export
export default App;
