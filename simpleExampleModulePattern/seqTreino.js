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
 */


 const ItemCtrl = (function(){
  
  const Item = function(id,name){
    this.id = id;
    this.name = name;
  }

  const data = {
    items: [
      { id: 01, name: "Cookie" },
      { id: 02, name: "Cake" },
      { id: 03, name: "Stake" }
    ],
    currentItem: null
  }

  return {
    getItems: function(){
      return data.items;
    },
    logData: function(){
      return data;
    },
    addItem: function(name){
      let ID;
      if(data.items.length > 0){
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      const newItem = new Item(ID, name);
      data.items.push(newItem);
      return newItem;
      
    }
  }
})();

const UICtrl = (function(){
  
  const UISelectors = {
    itemInput: "#itemInput",
    addBtn: ".addBtn",
    itemList: "#itemList"
  }

  return {
    getSelectors: function(){
      return UISelectors;
    },
    getItemsInput: function(){
      return {
        name: document.querySelector(UISelectors.itemInput).value
      }
    },
    addListItem: function(item){
      const li = document.createElement('li');
      li.id = `item-${item.id}`;
      li.innerHTML = `<li>${item.name}</li>`;
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li);
    }
  }
})();


const App = (function(){

  const loadEventListeners = function(){
    
    const UISelectors = UICtrl.getSelectors();

    const itemAddSubmit = function(){
      const input = UICtrl.getItemsInput();
      if(input.name !== ""){
        const newItem = ItemCtrl.addItem(input.name);
        UICtrl.addListItem(newItem);
      }      
    }

    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
  }

  return {
    init: function(){
      
      loadEventListeners();

    }
  }
})();


App.init();