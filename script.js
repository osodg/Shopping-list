/**
 * Add items to list via form - DONE
 * Remove items from list by clicking the "X" button
 * Clear all items from list with "clear all" button
 * Filter the items by typing in the filter field
 * All localStorage to persist items
 * Click on an item to put into "edit mode" and add to form
 * Update item
 * Deploy to GitHub Pages
 */

// Selectors
const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => {
    addItemToDOM(item);
  });
  checkUI();
}

function onAddItemSubmit(e) {
  e.preventDefault();
  const newItem = itemInput.value;

  // Validate input
  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  // Create item DOM element
  addItemToDOM(newItem);

  // Add item to local storage
  addItemToStorage(newItem);

  checkUI();

  itemInput.value = "";
}

function addItemToDOM(item) {
  // Create new list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  // Add li to the DOM
  itemList.appendChild(li);
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

// Add item to storage
function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  // Add new item to array
  itemsFromStorage.push(item);

  // convert to JSON string and set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

// Get items from local storage
function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  }
}

function removeItem(item) {
  // Remove item from DOM
  item.remove();

  // Remove item from storage
  removeItemFromStorage(item.textContent);

  checkUI();
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // Filter out the item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Re-set local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  // Clear items from storage
  localStorage.removeItem("items");

  checkUI();
}

function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll("li");
  // loop through each item and check if it matches the filter
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) !== -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function checkUI() {
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
}

// Initialize App
function init() {
  // Event Listeners
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);
}

init();
