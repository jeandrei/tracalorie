/**********************************STORAGE CONTROLLER**************************************
 *
 * will deal with Local Storage
 *
 */
const StorageCtrl = (function () {
  // Public methods
  return {
    getItemsFromStorage: function () {
      let items;
      if (localStorage.getItem("itemsls") === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem("itemsls"));
      }
      return items;
    },
    storeItem: function (item) {
      // Array to hold all the current items in the localStorage
      let items;
      // Check if any items in localStorage
      if (localStorage.getItem("itemsls") === null) {
        items = [];
        // Push new item
        items.push(item);
        // Set localStorage
        localStorage.setItem("itemsls", JSON.stringify(items));
      } else {
        // Get what is already in localStorage
        items = JSON.parse(localStorage.getItem("itemsls"));
        // Push new item
        items.push(item);
        // Re set localStorage
        localStorage.setItem("itemsls", JSON.stringify(items));
      }
    },
  };
})();

/**********************************ITEM CONTROLLER*****************************************
 *
 * for local data have to do with the items, calories
 */

// Item Controller
const ItemCtrl = (function () {
  // Item Constructor
  const Item = function (id, name) {
    this.id = id;
    this.name = name;
  };

  // Data Structure / State
  const data = {
    /* items: [
      {id: 0, name: 'Steak'},
      {id: 1, name: 'Cookie'},
      {id: 3, name: 'Egg'}

    ], */

    // 01 Get items From Local Storage
    items: StorageCtrl.getItemsFromStorage(),
    // when manipulating an item we always select currentItem to manipulate
    currentItem: null,
  };

  // Public methods
  return {
    // Return the items
    getItems: function () {
      return data.items;
    },
    // Creates ID and add the item to the data array
    addItem: function (name) {
      let ID;
      // Create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Create new item instance
      newItem = new Item(ID, name);

      // Add to the items array
      data.items.push(newItem);

      return newItem;
    },
    // You can use ItemCtrl.logDada() in the console to check what are the current values
    logData: function () {
      return data;
    },
  };
})();

/************************************UI CONTROLLER*****************************************
 *
 * Enything that has to do with the User Interface
 * showing, hiding things, getting input.
 */
const UICtrl = (function () {
  // Select all objects that you'll need in the app like buttons, fields and other elements
  const UISelectors = {
    itemInput: "#itemInput",
    addBtn: ".addBtn",
    itemList: "#itemList",
  };

  // Public methods
  return {
    // Put all items in the ul li list
    populateItemList: function (items) {
      let html = "";
      items.forEach(function (item) {
        html += `<li id="item-${item.id}">${item.name}</li>`;
      });
      // Insert items on the UI
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    // return all the UISelectors
    getSelectors: function () {
      return UISelectors;
    },
    // Get the items input value
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemInput).value,
      };
    },
    // Add the item to the web page
    addListItem: function (item) {
      // Create an li element
      const li = document.createElement("li");
      // Add ID
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = `<li>${item.name}</li>`;
      // Insert item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
  };
})();

/************************************APP CONTROLLER***************************************
 *
 * Where everithing will meet, and where we will put our
 * initial event listeners and will have our initializer
 * init function
 */
const App = (function (ItemCtrl, StorageCtrl, UICtrl) {
  //Load event listeners
  const loadEventListeners = function () {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    // 03 Call itemAddSubmit that will execute all the methods needed to add the item
    const itemAddSubmit = function (e) {
      // 04 Get input values from UI Controller
      const input = UICtrl.getItemInput();
      // Check for validation
      if (input.name !== "") {
        // 05 Create a new object an push into data array
        const newItem = ItemCtrl.addItem(input.name);
        // you can check if the item was push into the array in the console
        // ItemCtrl.logData();
        // Now we need to show in the browser
        // 06 Add item to UI list
        UICtrl.addListItem(newItem);

        // 07 Store in localStorage
        StorageCtrl.storeItem(newItem);
      }
    };

    // 02 Add button event click
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);
  };

  // Public methods
  return {
    // Execute methods to initiate the app
    init: function () {
      // Get items
      const items = ItemCtrl.getItems();

      // Populate Items in the UI
      UICtrl.populateItemList(items);

      // Load event listeners
      loadEventListeners();
    },
  };
})(ItemCtrl, StorageCtrl, UICtrl);

/***********************************INITIALIZE APP*****************************************
 *
 *
 */
//Call App.init method
App.init();

/**
 * ADD SEQUENCE
 * 1 ItemCtrl-> data -> items: StorageCtrl.getItemsFromStorage()
 * loads the items that are saved in the localStorage
 * 2 User clicks at the Add item button
 * 3 Add buttons call the function iteADD ITEM 5geCtrl.storeItem(newItem) to save the item
 * on localStorage
 */
