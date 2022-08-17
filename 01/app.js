
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
      {id:0, name: 'Stake Dinner', calories: 12000},
      {id:1, name: 'Cookie', calories: 400},
      {id:2, name: 'Eggs', calories: 300},
    ],
    currentItem: null,
    totalCalories: 0
  }

  // Everything in the return has a public method scope
  //to be able to access the items we need to return it
  //on terminal type itemCtrl.logData();
  return {
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
  
  // Public methods
  return {

  }
})();







/**
 * 2 App Controller
 * Where everithing will meet, and where we will put our
 * initial event listeners and will have our initializer
 * init function
 */
const App = (function(itemCtrl, UICtrl){
 
  // Public methods
  return{
    init: function(){
      console.log('initializing app...');
    }
  }

})(itemCtrl, UICtrl);






// 3 Initialize App
App.init();