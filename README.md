<h1><strong>Documentation for the JS Code:</strong></h1>
<p>👋 The code is designed to allow users to create cards with titles and descriptions, save them to local storage, and view them on the page. The code has the following functionality:</p>
<ul>
  <li><strong>Required Packages:</strong> None</li>
  <li><strong>Variables:</strong></li>
  <ul>
    <li><code>modal</code>: A variable that stores the HTML element with the ID "modal".</li>
    <li><code>addCardButton</code>: A variable that stores the HTML element with the ID "add-card-button".</li>
    <li><code>closeButton</code>: A variable that stores the HTML element with the class "close".</li>
    <li><code>saveButton</code>: A variable that stores the HTML button element with the type attribute of "submit".</li>
    <li><code>titleInput</code>: A variable that stores the HTML input element with the ID "title".</li>
    <li><code>descriptionInput</code>: A variable that stores the HTML input element with the ID "description".</li>
    <li><code>cardGrid</code>: A variable that stores the HTML element with the class "card-grid".</li>
    <li><code>cardData</code>: A variable that stores an empty array that will be used to store the card data.</li>
  </ul>
  <li><strong>Event Listeners:</strong></li>
  <ul>
    <li><code>addCardButton</code>: An event listener that waits for the user to click on the add card button, then displays the modal and hides the body's overflow.</li>
    <li><code>closeButton</code>: An event listener that waits for the user to click on the close button, then hides the modal and restores the body's overflow.</li>
    <li><code>saveButton</code>: An event listener that waits for the user to click on the save button, then prevents the form from submitting. The title and description input values are then retrieved, and the card data is added to the cardData array. The card data is then saved to local storage, and the modal is hidden, the body's overflow is restored, and the loadCards() function is called to render the updated cards on the page.</li>
    <li><code>window</code>: An event listener that waits for the user to click outside the modal, then hides the modal and restores the body's overflow.</li>
  </ul>
  <li><strong>Functions:</strong></li>
  <ul>
    <li><code>loadCards():</code> This function clears the card grid, retrieves the card data from local storage, and maps the data to create a new card for each entry. The delete and save button handlers are updated, and the resulting cards are appended to the card grid.</li>
    <li><code>createCard(data, index):</code> This function creates a new card with the provided title and description and appends it to the card grid. The card's index is also set as a data attribute.</li>
    <li><code>updateDeleteButtonHandlers():</code> This function updates the event listeners for all delete buttons, removing the old event listener and adding a new one that calls the deleteCard() function.</li>
    <li><code>deleteButtonHandler(event):</code> This function deletes a card and its corresponding data from local storage. It also updates the data attributes of the remaining cards.</li>
    <li><code>deleteCard(card, index)</code>: This function removes a card from the DOM, deletes the corresponding data from the cardData array, updates the data attributes of the remaining cards, and saves the updated data to local storage.</li>
  <li><code>updateSaveButtonHandlers()</code>: This function updates the event listeners for all save buttons, removing the old event listener and adding a new one that calls the <code>saveButtonHandler()</code> function.</li>
  <li><code>saveButtonHandler(event)</code>: This function prompts the user to enter a new title and description for the card, updates the card data, and saves the updated data to local storage.</li>
  <li><code>updateCardData(card, index, newData)</code>: This function updates the card data with the new title and description, updates the card elements on the page, and saves the updated data to local storage.</li>
  <li><code>updateCardDataAttributes()</code>: This function updates the data attributes of all cards on the page.</li>
</ul>
