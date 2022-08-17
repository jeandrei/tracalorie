

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
    // returns the itens on the data object
    getItems: function(){
      return data.items;
    },

    logData: function(){
      return data;
    }
  }

})();




 

const UICtrl = (function(){

  // Create a UI selector to make it easier to select items of html code
  // If for some reason you need to change in the html you can just
  // update in the UISelectors and it will work again
  const UISelectors = {
    itemList: '#item-list'
  }

  return {
    // returns the htm list with the items
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

    }
  }
})();








const App = (function(itemCtrl, UICtrl){
 
  
  return{
    init: function(){
      // Fetch items from data structure 
      const items = itemCtrl.getItems();

      // Populate lists with items
      UICtrl.populateItemList(items);
    }
  }

})(itemCtrl, UICtrl);






// 3 Initialize App
App.init();