

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
    getItemById: function(id){
      let found = null;   
      data.items.forEach(function(item){
        if(item.id === id){
          found = item;
        }
      });
    return found;
    }, 
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
    setCurrentItem: function(item){
      data.currentItem = item;  
    },   
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
    // get item list
    listItems: '#item-list li',  
    addBtn: '.add-btn',     
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
    getItemInput: function(){
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
    clearInput: function(){
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCalories).value = '';
    },    
    addItemToForm: function(){
      document.querySelector(UISelectors.itemNameInput).value = itemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCalories).value = itemCtrl.getCurrentItem().calories;      
      UICtrl.showEditState();
    },
    hideList: function(){
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
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
    
    // Disable submit on enter
    document.addEventListener('keypress', function(e){
      if(e.keyCode === 13 || e.wich === 13){
        e.preventDefault();
        return false;
      }
    });
    
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
  }
  
  const itemAddSubmit = function(e){   
    const input = UICtrl.getItemInput();
    if(input.name != '' && input.calories !== ''){      
      const newItem = itemCtrl.addItem(input.name, input.calories);       
        UICtrl.addListItem(newItem);          
        const totalCalories = itemCtrl.getTotalCalories();
        UICtrl.showTotalCalories(totalCalories); 
        UICtrl.clearInput();    
    }
    e.preventDefault();
  }

 
  const itemEditClick = function(e){    
    if(e.target.classList.contains('edit-item')){     
      const listId = e.target.parentNode.parentNode.id;     
      const listIdArr = listId.split('-');      
      const id = parseInt(listIdArr[1]);      
      const itemToEdit = itemCtrl.getItemById(id);      
      itemCtrl.setCurrentItem(itemToEdit);     
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
    // Clear edit 
    UICtrl.clearEditState();
    e.preventDefault();
  }
   
  return{
    init: function(){ 
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