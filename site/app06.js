

 const itemCtrl = (function(){  
  const Item = function(id, name, calories){
  this.id = id;
  this.name = name;
  this.calories = calories;
  }

  
  const data = {
    items: [
     /*  {id:0, name: 'Stake Dinner', calories: 12000},
      {id:1, name: 'Cookie', calories: 400},
      {id:2, name: 'Eggs', calories: 300}, */
    ],
    currentItem: null,
    totalCalories: 0
  }

 
  return {
    
    getItems: function(){
      return data.items;
    },

    
    addItem: function(name,calories){
      let ID;     
      if(data.items.length > 0){        
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }
      
      calories = parseInt(calories);      
      newItem = new Item(ID, name, calories);    
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
    getTotalCalories: function(){
      let total = 0;
      data.items.forEach(function(item){
        total += item.calories;        
      });
      data.totalCalories = total;
      return data.totalCalories;
    },
    logData: function(){
      return data;
    }
  }

})();

 

const UICtrl = (function(){
  
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
    getItemImput: function(){
      return{
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCalories).value
      }
    },    
    addListItem: function(item){     
      document.querySelector(UISelectors.itemList).style.display = 'block';     
      const li = document.createElement('li');     
      li.className = 'collection-item';      
      li.id = `item-${item.id}`;     
      li.innerHTML = ` <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;

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
    hideList: function(){
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories: function(totalCalories){
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    // Clear Edit State
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
    getSelectors: function(){
      return UISelectors;
    }
  }
})();


const App = (function(itemCtrl, UICtrl){  
  const loadEventListeners = function(){  
    const UISelectors = UICtrl.getSelectors();  
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

     // Edit icon click event
     document.querySelector(UISelectors.itemList).addEventListener('click', itemUpdateSubmit);
  }
  
  const itemAddSubmit = function(e){   
    const input = UICtrl.getItemImput();
    if(input.name != '' && input.calories !== ''){      
      const newItem = itemCtrl.addItem(input.name, input.calories);       
        UICtrl.addListItem(newItem);          
        const totalCalories = itemCtrl.getTotalCalories();
        UICtrl.showTotalCalories(totalCalories); 
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
   
  return{
    init: function(){ 
      // Clear edit state / Set initial state
      UICtrl.clearEditState();

      const items = itemCtrl.getItems();       
      if(items.length === 0){
        UICtrl.hideList();
      } else {       
        UICtrl.populateItemList(items);
      }
      const totalCalories = itemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);       
      loadEventListeners();
    }
  }

})(itemCtrl, UICtrl);


App.init();