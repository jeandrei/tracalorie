/**
 * 1 Criar o ItemCtrl
 *    Criar o objeto Item com id e nome
 *    Criar a const data com os dados de exemplo
 *    Public methods
 *    getItems
 *    logData
 * 
 * 2 Criar UICtrl
 *    Crir a const UISelectors
 *    Public Methods
 *    getSelectors
 *    getItemsInput
 *   
 *
 * 3 Criar App
 *    Criar loadEventListeners
 *      UISelectors recebe getSelectors
 *      itemAddSubmit 
 *        input recebe getItemsInput
 *        console inputs
 *        Adiciona evento clic no botão Add item executando o metodo itemAddSubmit
 *    Public methods
 *      loadEventListeners
 * 
 * 4 Inicia o App
 * 
 * 5 No ItemCtrl cria a função 
 *    addItem
 *    verifica se tem itens no array
 *    gera um ID se nada ID = 0 se não o ID vai ser o número de registros +1
 *    cria um newItem
 *    push no data
 *    retorna newItem
 * 6 no UICtrl adicionar a função
 *    addListItem
 *    cria um elemento li
 *    define o li.id
 *    define o li.innerhtml
 *    insertAdjacentElement
 * 
 * 7 Criar o StorageCtrl
 *    storeItem
 *      cria um array let items;
 *      verifica se existe items na localStorage chamada itemsls se for igual a null
 *      da um push no array items      
 *      localstorage setitems itemsls no array items
 *      caso constrário caso não seja null itemsls
 *      items recebe o que existe na localStorage itemsls
 *      da um push do item recebido na função no array items 
 *      reescreve tudo na localStorage set items itemsls items
 *    getItemsFromStorage
 *      cria um variável items;
 *      verifica se a localStorage itemsls é null se for null define o array como vazio []
 *      caso contrário items recebe o que tiver em itemsls
 *      retorna items
 * 
 * 8 ItemCtrl items recebe StorageCtrl.getItemsFromStorage()
 * 
 * 9 No App init criamos uma const items que recebe ItemCtrl getItems()
 * 
 * 10 Criamos a na UICtrl o metodo populateItemList(items) que vai colocar os itens na ul
 *      populateItemList passando o item
 *      cria uma variável html recebendo vazio
 *      para cada item passado o html acumula o código li
 *      por fim insere o html na itemList
 * 
 * 11 Chama a populateItemList no init
 *      
 *      
 *    
 */

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
