import React from "react";

interface MessageResponse {
  success: boolean;
  [key: string]: any; // Adjust according to the actual response structure
}

const App = () => {
  const testclick = () => {
    chrome.runtime.sendMessage(
      { action: "getAddress" },
      (response: MessageResponse) => {
        if (response.success) {
          console.info(response); // Log the successful response to the console
        } else {
          console.error(response); // Log the error response to the console
        }
      }
    );
  };

  return (
    <div>
      <h1>Trezor Extension</h1>
      <button id="tab" onClick={testclick}>
        Get Address
      </button>
    </div>
  );
};

export default App;
