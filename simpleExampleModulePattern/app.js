/**
 * 1 Criar o ItemCtrl
 *    Criar o objeto Item com id e nome e calories e também currentItem e totalCalories
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
 *    Public methods
 *      loadEventListeners
 * 
 * 4 Inicia o App
 * 
 * 
 * 5 Total Calories 
 *    Criamos a função que vai calcular o todal de calorias para ser mostrado no Total 
 *    Calories
 *    no ItemCtrl criar a função getTotalCalories
 *    que da um foreach nos itens somando as calorias e passando o valor para 
 *    o data.totalCalories e dando um return também no data.totalCalories
 *    Criamos também a função UICtrl.showTotalCalories(totalCalories) que vai dar um
 *    innerText no totalcalories do index.html
 *    por fim no init chamamos
 *    totalCalories = ItemCtrl.getTotalCalories();
 *    UICtrl.showTotalCalories(totalCalories);
 * 
 * 
 * 
 * 5 Add new Item
 * 
 * 6 No UICtrl cria a função clearInput que faz com que os campos recebam ""
 *    Dentro do App e dentro de loadEventListeners cria a função itemAddSubmit
 *    Logo abaixo ainda dentro de loadEventListeners já cria o evento onclick do botão add
 *    chamando a função itemAddSubmit 
 *    Em ItemAddSubmit
 *    Criamos a const input que recebe getItemsInput
 *    No ItemCtrl cria a função
 *    addItem
 *       verifica se tem itens no array
 *       gera um ID se nada ID = 0 se não o ID vai ser o número de registros +1
 *       se tiver algum campo numérico como calories converta para número com parseint por
 *       exemplo, caso contrário não será possível fazer operações matemáticas
 *       cria um newItem
 *       push no data
 *       retorna newItem
 *       em itemAddSubmit cria uma const newItem recebendo o return da função addItem 
 *       passando o input para a função
 *       em itemAddSubmit chama a função UICtrl.clearInput();
 *       em itemAddSubmit chama novamente a funçao para atualiza o totalCalories
 *       totalCalories = ItemCtrl.getTotalCalories();
 *       UICtrl.showTotalCalories(totalCalories);
 *       Chama a função
 *    No UICtrl adicionar a função
 *    addListItem
 *        cria um elemento li
 *        define o li.id
 *        define o li.innerhtml
 *        insertAdjacentElement
 *        Por fim em itemAddSubmit chama addListItem(newItem)
 *        UICtrl.addListItem(newItem);
 *    
 * 
 *  7 Mostrar todos items na li da página index
 *        No App init criamos uma const items que recebe ItemCtrl getItems() * 
 *        Criamos na UICtrl o metodo populateItemList(items) 
 *        que vai colocar os itens na ul
 *          populateItemList passando o item
 *          cria uma variável html recebendo vazio
 *          para cada item passado o html acumula o código li
 *          por fim insere o html na itemList 
 *    Chama a populateItemList no init
 *    
 *    
 * 
 * 8 Criar o StorageCtrl
 *    storeItem
 *      cria um array let items;
 *      verifica se existe items na localStorage chamada itemsls se for igual a null
 *      da um push no array items      
 *      localstorage setitems itemsls no array items
 *      caso constrário caso não seja null itemsls
 *      items recebe o que existe na localStorage itemsls
 *      da um push do item recebido na função no array items 
 *      reescreve tudo na localStorage set items itemsls items
 *      em itemAddSubmit chama o storeItem(newItem)
 *    getItemsFromStorage
 *      cria um variável items;
 *      verifica se a localStorage itemsls é null se for null define o array como vazio []
 *      caso contrário items recebe o que tiver em itemsls
 *      retorna items
 *    substitui os valores de ItemCtrl data pelo retorno da função 
 *    StorageCtrl.getItemsFromStorage
 * 
 * 9 Mostrar e ocultar os botões Update, Delete e Back 
 *    Criamos a função que vai esconder os botões de update e delete
 *    UICtrl.clearEditSTate() 
 *      chama a função UICtrl.clearInput() para limpar os campos
 *      definimos os campos update, delete e back como display none e add display inline
 *    Carregamos a função clearEditSTate junto no app init primeira linha
 * 
 * 9 Edit item   
 *    
 *       
 * 
 * 
 * 16 no App dentro do init antes do loadEventListener também repetir o passo 15 
 * 
 * 19 Cria a função ItemCtrl.setCurrentItem que vai setar o item atual que estamos editando
 * para o current item
 * 
 * 
 * 20 UICtrl getItemById que retorna um item pelo id 
 * 
 * 21 Criar a função ItemCtrl.getCurrentItem que vai retornar o data.currentItem
 * 
 * 22 Criamos a UICtrl addItemToForm que vai adicionar os ítens que estiverem no objeto
 * Item nos inputs do formulário
 * 
 * 23 Criamos uma const itemEditClick dentro de App assim como foi feito do itemAddSubmit
 * e chamamos ela no evenListener do botão do UISelectors.itemList filtrando pela
 * classList contains edit-item, pegamos o id e passamos para a const listId
 * damos um split na listId e jogamos para um array listIdArr
 * pegamos o id parseint listArr[1] e o itemToEdit = itemCtrl.getItemById(id);
 * setamos o current item para itemToEdit e adicionamos o item ao form UICtrl.addItemToForm
 * 
 * 
 *      
 *      
 *    
 */




/**********************************STORAGE CONTROLLER**************************************
 *
 * will deal with Local Storage
 *
 */
const StorageCtrl = (function () {
  // Public methods
  return {
    getItemsFromStorage: function () {
      let items;
      if (localStorage.getItem("itemsls") === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem("itemsls"));
      }
      return items;
    },
    storeItem: function (item) {
      // Array to hold all the current items in the localStorage
      let items;
      // Check if any items in localStorage
      if (localStorage.getItem("itemsls") === null) {
        items = [];
        // Push new item
        items.push(item);
        // Set localStorage
        localStorage.setItem("itemsls", JSON.stringify(items));
      } else {
        // Get what is already in localStorage
        items = JSON.parse(localStorage.getItem("itemsls"));
        // Push new item
        items.push(item);
        // Re set localStorage
        localStorage.setItem("itemsls", JSON.stringify(items));
      }
    },
  };
})();

/**********************************ITEM CONTROLLER*****************************************
 *
 * for local data have to do with the items, calories
 */

// Item Controller
const ItemCtrl = (function () {
  // Item Constructor
  const Item = function (id, name) {
    this.id = id;
    this.name = name;
  };

  // Data Structure / State
  const data = {
    /* items: [
      {id: 0, name: 'Steak'},
      {id: 1, name: 'Cookie'},
      {id: 3, name: 'Egg'}

    ], */

    // 01 Get items From Local Storage
    items: StorageCtrl.getItemsFromStorage(),
    // when manipulating an item we always select currentItem to manipulate
    currentItem: null,
  };

  // Public methods
  return {
    // Return the items
    getItems: function () {
      return data.items;
    },
    // Creates ID and add the item to the data array
    addItem: function (name) {
      let ID;
      // Create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Create new item instance
      newItem = new Item(ID, name);

      // Add to the items array
      data.items.push(newItem);

      return newItem;
    },
    // You can use ItemCtrl.logDada() in the console to check what are the current values
    logData: function () {
      return data;
    },
  };
})();

/************************************UI CONTROLLER*****************************************
 *
 * Enything that has to do with the User Interface
 * showing, hiding things, getting input.
 */
const UICtrl = (function () {
  // Select all objects that you'll need in the app like buttons, fields and other elements
  const UISelectors = {
    itemInput: "#itemInput",
    addBtn: ".addBtn",
    itemList: "#itemList",
  };

  // Public methods
  return {
    // Put all items in the ul li list
    populateItemList: function (items) {
      let html = "";
      items.forEach(function (item) {
        html += `<li id="item-${item.id}">${item.name}</li>`;
      });
      // Insert items on the UI
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    // return all the UISelectors
    getSelectors: function () {
      return UISelectors;
    },
    // Get the items input value
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemInput).value,
      };
    },
    // Add the item to the web page
    addListItem: function (item) {
      // Create an li element
      const li = document.createElement("li");
      // Add ID
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = `<li>${item.name}</li>`;
      // Insert item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
  };
})();

/************************************APP CONTROLLER***************************************
 *
 * Where everithing will meet, and where we will put our
 * initial event listeners and will have our initializer
 * init function
 */
const App = (function (ItemCtrl, StorageCtrl, UICtrl) {
  //Load event listeners
  const loadEventListeners = function () {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    // 03 Call itemAddSubmit that will execute all the methods needed to add the item
    const itemAddSubmit = function (e) {
      // 04 Get input values from UI Controller
      const input = UICtrl.getItemInput();
      // Check for validation
      if (input.name !== "") {
        // 05 Create a new object an push into data array
        const newItem = ItemCtrl.addItem(input.name);
        // you can check if the item was push into the array in the console
        // ItemCtrl.logData();
        // Now we need to show in the browser
        // 06 Add item to UI list
        UICtrl.addListItem(newItem);

        // 07 Store in localStorage
        StorageCtrl.storeItem(newItem);
      }
    };

    // 02 Add button event click
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);
  };

  // Public methods
  return {
    // Execute methods to initiate the app
    init: function () {
      // Get items
      const items = ItemCtrl.getItems();

      // Populate Items in the UI
      UICtrl.populateItemList(items);

      // Load event listeners
      loadEventListeners();
    },
  };
})(ItemCtrl, StorageCtrl, UICtrl);

/***********************************INITIALIZE APP*****************************************
 *
 *
 */
//Call App.init method
App.init();

/**
 * ADD SEQUENCE
 * 1 ItemCtrl-> data -> items: StorageCtrl.getItemsFromStorage()
 * loads the items that are saved in the localStorage
 * 2 User clicks at the Add item button
 * 3 Add buttons call the function iteADD ITEM 5geCtrl.storeItem(newItem) to save the item
 * on localStorage
 */
