
/**
 * Storage Controller
 * will deal with Local Storage
 */



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
    items: [
      /* {id:0, name: 'Stake Dinner', calories: 12000},
      {id:1, name: 'Cookie', calories: 400},
      {id:2, name: 'Eggs', calories: 300}, */
    ],
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
    addBtn: '.add-btn',
    //add buttons
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',

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
    getItemImput: function(){
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
      li.innerHTML = ` <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
      // INsert Item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
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
const App = (function(itemCtrl, UICtrl){

  // Load event listeners
  const loadEventListeners = function(){
    //Get UI Selectors from UICtrl
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    // Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemUpdateSubmit);
  }

  // Add Item submit
  const itemAddSubmit = function(e){
    
    // Get form input from UI Controller
    const input = UICtrl.getItemImput();
    
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


      // Clear fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  }

  // Update item submit
  const itemUpdateSubmit = function(e){
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

})(itemCtrl, UICtrl);






// 3 Initialize App
App.init();