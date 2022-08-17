

 const itemCtrl = (function(){  
  const Item = function(id, name, calories){
  this.id = id;
  this.name = name;
  this.calories = calories;
  }

  
  const data = {
    items: [
      {id:0, name: 'Stake Dinner', calories: 12000},
      {id:1, name: 'Cookie', calories: 400},
      {id:2, name: 'Eggs', calories: 300},
    ],
    currentItem: null,
    totalCalories: 0
  }

 
  return {
    
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

    logData: function(){
      return data;
    }
  }

})();




 

const UICtrl = (function(){
  
  const UISelectors = {
    itemList: '#item-list',
    //add btn to UISelectors
    addBtn: '.add-btn',
    // add inputs
    itemNameInput: '#item-name',
    itemCalories: '#item-calories'
  }

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
      
      document.querySelector(UISelectors.itemList).innerHTML = html;

    },
    // get items from input
    getItemImput: function(){
      return{
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCalories).value
      }
    },
    //create a method to allow use the selectors in other methods
    getSelectors: function(){
      return UISelectors;
    }
  }
})();








const App = (function(itemCtrl, UICtrl){

  // Load event listeners
  const loadEventListeners = function(){
  //Get UI Selectors from UICtrl
  const UISelectors = UICtrl.getSelectors();

  // Add item event
  document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
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
    }

    e.preventDefault();
  }
 
  
  return{
    init: function(){      
      const items = itemCtrl.getItems();     
      UICtrl.populateItemList(items);
      // Load event listeners
      loadEventListeners();
    }
  }

})(itemCtrl, UICtrl);







App.init();