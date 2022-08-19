// Basic structure

/* (function(){
  // Declare private vars and functions

  return {
    // Declare public var and functions
  }
})(); */

const UICtrl = (function(){
  let text = 'Hello World';

  const changeText = function(){
    const element = document.querySelector('h1');
    element.textContent = text;
  }

  // return will be public, we can access from outside
  return {
    callChangeText: function(){
      changeText();
    }
  }
})();// Immediately-invoke Function (IIFE), com esses parenteses
//no final a função executa imediatamente sem precisar chamar


UICtrl.callChangeText();