document.addEventListener("DOMContentLoaded", () => {
  const newTabButton = document.getElementById("tab");
  if (newTabButton) {
    newTabButton.addEventListener("click", () => {
      chrome.runtime.sendMessage({ action: "getAddress" }, (response) => {
        // Check if the response indicates success

        if (response.success) {
          console.info(response); // Log the successful response to the console
          // Display the response in the 'result' element on the page
          if (result) {
            result.innerText = JSON.stringify(response);
          }
        } else {
          console.error(response); // Log the error response to the console
          // Display an error message in the 'result' element on the page
          if (result) {
            result.innerText = "Error: " + response.error;
          }
        }
      });
    });
  }
});
