

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

    logData: function(){
      return data;
    }
  }

})();

 

const UICtrl = (function(){
  
  const UISelectors = {
    itemList: '#item-list',    
    addBtn: '.add-btn',   
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
    getItemImput: function(){
      return{
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCalories).value
      }
    },
    // Add Item to the list
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
    // Hide the ul list
    hideList: function(){
      document.querySelector(UISelectors.itemList).style.display = 'none';
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
  }
  
  const itemAddSubmit = function(e){   
    const input = UICtrl.getItemImput();
    if(input.name != '' && input.calories !== ''){      
      const newItem = itemCtrl.addItem(input.name, input.calories);
        // Add item to the UI
        UICtrl.addListItem(newItem); 
        // Clear fields
        UICtrl.clearInput();    
    }
    e.preventDefault();
  }
   
  return{
    init: function(){      
      const items = itemCtrl.getItems(); 

      // Check if any items if no hide the list
      if(items.length === 0){
        UICtrl.hideList();
      } else {
        // Populate lists with items
        UICtrl.populateItemList(items);
      } 

      loadEventListeners();
    }
  }

})(itemCtrl, UICtrl);


App.init();