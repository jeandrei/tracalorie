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
 * 7 Criar o StorageCtrl
 *    storeItem
 *      cria um array let items;
 *      verifica se existe items na localStorage chamada itemsls se for igual a null
 *      da um push no array items      
 *      localstorage setitems itemsls no array items
 *      caso constrário caso não seja null itemsls
 *      items recebe o que existe na localStorage itemsls
 *      da um push do item recebido na função no array items 
 *      reescreve tudo na localStorage set items itemsls items
 *    getItemsFromStorage
 *      cria um variável items;
 *      verifica se a localStorage itemsls é null se for null define o array como vazio []
 *      caso contrário items recebe o que tiver em itemsls
 *      retorna items
 * 
 * 8 ItemCtrl items recebe StorageCtrl.getItemsFromStorage()
 * 
 * 9 No App init criamos uma const items que recebe ItemCtrl getItems()
 * 
 * 10 Criamos a na UICtrl o metodo populateItemList(items) que vai colocar os itens na ul
 *      populateItemList passando o item
 *      cria uma variável html recebendo vazio
 *      para cada item passado o html acumula o código li
 *      por insere o html na itemList
 * 
 * 11 Chama a populateItemList no init
 *      
 *      
 *    
 */


 const StorageCtrl = (function(){


  return {
    getItemsFromStorage: function(){
      let items;
      if(localStorage.getItem('itemsls') === null){
        items = [];
      }
      else {
        items = JSON.parse(localStorage.getItem('itemsls'));
      }
    return items;
    },
    storeItem: function(item){
      let items = [];
      if(localStorage.getItem('itemsls') === null){
        items.push(item);
        localStorage.setItem('itemsls', JSON.stringify(items));
      } else {
        items = JSON.parse(localStorage.getItem('itemsls'));
        items.push(item);
        localStorage.setItem('itemsls', JSON.stringify(items));
      }
    }

  }
})();

const ItemCtrl = (function(){

  const Item = function(id,name){
    this.id = id;
    this.name = name;
  }

  const data = {
      items: StorageCtrl.getItemsFromStorage(),
    /* items:[
      { id:01, name:'Cake' },
      { id:02, name:'Stake' },
      { id:03, name:'Cookie' }
    ], */
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
        ID = data.items[data.items.length -1].id + 1; 
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
    itemInput:"#itemInput",
    addBtn:".addBtn",
    itemList:"#itemList"
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
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    },
    populateItemList: function(items){      
      let html = "";
      items.forEach(function(item){
        html += `<li id="item-${item.id}">${item.name}</li>`;
      });
      document.querySelector(UISelectors.itemList).innerHTML = html;
    }
  }

})();


const App = (function(){
  
  const loadEventListeners = function(){
    
    const UISelectors = UICtrl.getSelectors();

    const itemAddSubmit = function(e){
      const input = UICtrl.getItemsInput();
      const newItem = ItemCtrl.addItem(input.name);
      UICtrl.addListItem(newItem);
      StorageCtrl.storeItem(newItem);
      e.preventDefault();
    }

    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
  }

  return {
    init: function(){
      const items = ItemCtrl.getItems();     
      UICtrl.populateItemList(items);
      loadEventListeners();

    }
  }
})();

App.init();