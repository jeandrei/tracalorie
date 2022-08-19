/**
 * Storage Controller
 * will deal with Local Storage
 *  
 */
const StorageCtrl = (function(){
  // Public methods
  return {
    storeItem: function(item){
      let items;
      // Check if any items in localStorage
      if(localStorage.getItem('items') === null){
        items = [];
        // Push new item
        items.push(item);
        // Set localStorage
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        // Get what is already in localStorage
        items = JSON.parse(localStorage.getItem('items'));
        // Push the new item
        items.push(item);
        // Re set localStorage
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    getItemsFromStorage: function(){
      let items;
      if(localStorage.getItem('items') === null){
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },
    updateItemStorage: function(updatedItem){
      let items = JSON.parse(localStorage.getItem('items'));
      
      items.forEach(function(item, index){
        if(updatedItem.id === item.id){
          //remove the item and replace with the updatedItem
          items.splice(index, 1, updatedItem);
        }
      });
    // set items on localStorage
    localStorage.setItem('items', JSON.stringify(items));
    },
    deleteItemFromStorage: function(id){
      let items = JSON.parse(localStorage.getItem('items'));
      
      items.forEach(function(item, index){
        if(id === item.id){
          //remove the item
          items.splice(index, 1);
        }
      });
    // set items on localStorage
    localStorage.setItem('items', JSON.stringify(items));
    },
    clearItemsFromStorage: function(){
      localStorage.removeItem('items');
    }
  }
})();



/**
 * 1 Item Controller
 * for local data have to do with the items, calories
 */
 const itemCtrl = (function(){
  // Item Constructor
  const Item = function(id, name, calories){
  this.id = id;
  this.name = name;
  this.calories = calories;
  }

  // Data Structure / State
  const data = {
    /*    items: [
         {id:0, name: 'Stake Dinner', calories: 12000},
         {id:1, name: 'Cookie', calories: 400},
         {id:2, name: 'Eggs', calories: 300}, 
       ], */
       items: StorageCtrl.getItemsFromStorage(),
       currentItem: null,
       totalCalories: 0
  }

  // Everything in the return has a public method scope
  //to be able to access the items we need to return it
  //on terminal type itemCtrl.logData();
  return {
    // returns the itens on the data object
    getItems: function(){
      return data.items;
    },

    //Add Item
    addItem: function(name,calories){
      let ID;
      // Create ID
      if(data.items.length > 0){        
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number
      calories = parseInt(calories);

      // Create new item
      newItem = new Item(ID, name, calories);
      // Add to items array
      data.items.push(newItem);

      return newItem;
    },
    // Get item by id
    getItemById: function(id){
      let found = null;
      // Loop through items
      data.items.forEach(function(item){
        if(item.id === id){
          found = item;
        }
      });
      return found;
    },
    // Update item in the itemCtrl you can check that
    // on the console itemCtrl.logData();
    updateItem: function(name, calories){
      // Calories to number
      calories = parseInt(calories);
      let found = null;
      data.items.forEach(function(item){
        if(item.id === data.currentItem.id){
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
    deleteItem: function(id){
      // Get ids
      ids = data.items.map(function(item){
        return item.id;
      });
      // Get index
      const index = ids.indexOf(id);
      // Remove item
      data.items.splice(index, 1);
      // you can check if removed by in the console itemCrl.logData();
    },
    // Clear all items
    clearAllItems: function(){   
      data.items = [];
      //nothing will happend to the UI but you can check by
      //console ItemCtrl.logData();
    },
    // Set the item to be edit
    setCurrentItem: function(item){
      data.currentItem = item;
      // edit the item and type in the console
      // itemCtrl.logData(); in the object will be set currentItem
    },
    // Get current Item
    getCurrentItem: function(){
      return data.currentItem;
    },
    // Get total Calories
    getTotalCalories: function(){
      let total = 0;

      data.items.forEach(function(item){
        total += item.calories;        
      });
      // Set total calories in data structure
      data.totalCalories = total;

      // Return total
      return data.totalCalories;
    },
    logData: function(){
      return data;
    }
  }

})();// Immediately-invoke Function (IIFE), com esses parenteses
//no final a função executa imediatamente sem precisar chamar






 
 /**
  * UI Controller
  * Enything that has to do with the User Interface
  * showing, hiding things, getting input.
  */
const UICtrl = (function(){

  // Create a UI selector to make it easier to select items of html code
  // If for some reason you need to change in the html you can just
  // update in the UISelectors and it will work again
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',  
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCalories: '#item-calories',
    totalCalories: '.total-calories'    

  }
  
  // Public methods
  return {
    populateItemList: function(items){
      let html = '';
      items.forEach(function(item){
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`;
      });

      // Insert list Items
      document.querySelector(UISelectors.itemList).innerHTML = html;

    },

    // get items from input
    getItemInput: function(){
      return{
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCalories).value 
        
      }
    },
    addListItem: function(item){
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      // Add ID
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
      // INsert Item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    },
    // Update list item when click update
    updateListItem: function(item){
      // Return a node list
      let listItems = document.querySelectorAll(UISelectors.listItems);
      // Turn Node list into array
      listItems = Array.from(listItems);
      listItems.forEach(function(listItem){
        const itemID = listItem.getAttribute('id');
        // if it is true that means that this is the one we want to update
        if(itemID === `item-${item.id}`){
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
        }
      })
    },
    // Delete the item from the UI list
    deleteListItem: function(id){
      const itemId = `#item-${id}`;
      const item = document.querySelector(itemId);
      item.remove();
    },
    clearInput: function(){
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCalories).value = '';
    },
    // add Item to the form 
    addItemToForm: function(){
      document.querySelector(UISelectors.itemNameInput).value = itemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCalories).value = itemCtrl.getCurrentItem().calories;
      // Show buttons on edit
      UICtrl.showEditState();
    },
    removeItems: function(){
      let listItems = document.querySelectorAll(UISelectors.listItems);
      // Turn Node list into array
      listItems = Array.from(listItems);
      listItems.forEach(function(item){
        item.remove();
      });
    },
    // Hide the ul list
    hideList: function(){
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    // Show total in the page  
    showTotalCalories: function(totalCalories){
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    clearEditState: function(){
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    // Show buttons on edit
    showEditState: function(){      
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    //create a method to allow use the selectors in other methods
    getSelectors: function(){
      return UISelectors;
    }
  }
})();







/**
 * 2 App Controller
 * Where everithing will meet, and where we will put our
 * initial event listeners and will have our initializer
 * init function
 */
const App = (function(itemCtrl,StorageCtrl,UICtrl){

  // Load event listeners
  const loadEventListeners = function(){
    //Get UI Selectors from UICtrl
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    // Disable submit on enter
    document.addEventListener('keypress', function(e){
      if(e.keyCode === 13 || e.wich === 13){
        e.preventDefault();
        return false;
      }
    });

    // Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

     // Delete item event
     document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

    // Back button event
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

    // Clear items event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
  }

  // Add Item submit
  const itemAddSubmit = function(e){
    
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();
    
    // Check for name and calorie input
    if(input.name != '' && input.calories !== ''){
      // Add item
      const newItem = itemCtrl.addItem(input.name, input.calories);
      // You can test in the console typing itemCtrl.logData();

      // Add item to the UI
      UICtrl.addListItem(newItem);


      // Get total calories
      const totalCalories = itemCtrl.getTotalCalories();
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Store in localStorage
      StorageCtrl.storeItem(newItem);

      // Clear fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  }

  // Click edit item
  const itemEditClick = function(e){
    //If the object that is clicked contains the edit-item class
    //in this case <i class="edit-item fa fa-pencil">
    if(e.target.classList.contains('edit-item')){
      // Get list item id(item-0, item-1)
      //parentNode need to get back two times to get the line
      //<li class="collection-item" id="item-0"> where we have id
      const listId = e.target.parentNode.parentNode.id;
      
      // Break into an array returns array [0:"item",1:"0"]
      const listIdArr = listId.split('-');
      
      // Get actual id just the number
      const id = parseInt(listIdArr[1]);
      
      // Get item
      const itemToEdit = itemCtrl.getItemById(id);
      
      // Set current item
      itemCtrl.setCurrentItem(itemToEdit);
      
      // Add Item to form
      UICtrl.addItemToForm();
    }
    e.preventDefault();
  }

  // Update item submit
  const itemUpdateSubmit = function(e){
    // Get item input
    const input = UICtrl.getItemInput();
    // Updatte item
    const updateItem = itemCtrl.updateItem(input.name, input.calories);
    // Update UI
    UICtrl.updateListItem(updateItem);
    // Get total calories
    const totalCalories = itemCtrl.getTotalCalories();
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Update localStorage
    StorageCtrl.updateItemStorage(updateItem);

    // Clear edit 
    UICtrl.clearEditState();

    e.preventDefault();
  }
  
  // Delete button event
  const itemDeleteSubmit = function(e){
    
    // Get current item
    const currentItem = itemCtrl.getCurrentItem();

    // Delete from data structure
    itemCtrl.deleteItem(currentItem.id);

    // Delete from UI
    UICtrl.deleteListItem(currentItem.id);

    // Get total calories
    const totalCalories = itemCtrl.getTotalCalories();
     
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Delete from localStorage
    StorageCtrl.deleteItemFromStorage(currentItem.id);

    // Clear edit 
    UICtrl.clearEditState();

    e.preventDefault();
  }

  // Clear items event
  const clearAllItemsClick = function(){
    // Delete all items from data structure    
    itemCtrl.clearAllItems();   

    // Get total calories
    const totalCalories = itemCtrl.getTotalCalories();

    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);
    
    // Remove From UI
    UICtrl.removeItems();

    // Clear from localStorage
    StorageCtrl.clearItemsFromStorage();

    // Hide the UL
    UICtrl.hideList();
  }
 
  // Public methods
  return{
    init: function(){  
      // Clear edit state / Set initial state
      UICtrl.clearEditState();
      
      // Fetch items from data structure 
      const items = itemCtrl.getItems();

      // Check if any items if no hide the list
      if(items.length === 0){
        UICtrl.hideList();
      } else {
        // Populate lists with items
        UICtrl.populateItemList(items);
      }

      // Get total calories
      const totalCalories = itemCtrl.getTotalCalories();
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);
      

      // Load event listeners
      loadEventListeners();
    }
  }

})(itemCtrl,StorageCtrl,UICtrl);






// 3 Initialize App
App.init();