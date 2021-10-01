const baseUrl = "http://localhost:3000"

window.onload = () => {
    //renderiza todos os cards na exibicao
    renderAllCards()
    //renderiza a lista de categorias na barra lateral
    renderCategoriesList()
}


/* REFERÊNCIAS A ELEMENTOS NA PÁGINA */
//Botão "adicionar"
const addBtn = document.querySelector(".botaoadicionar");

//Item "todas as tarefas" do menu de categorias
const allTasksItem = document.querySelector(".todas-as-tarefas");

//Titulo com o nome da categoria atual
const tituloSecao = document.querySelector(".tituloSecao")

//Lista de opcoes dentro do botao adicionar
const addOptionsList = document.querySelector('.listaOpcoesAdd')

//Tarefa
const taskBtn = addOptionsList.children[0]
const addTaskWindow = document.querySelector(".addTaskWindow");
const saveTaskBtn = document.querySelector(".v59_175");


//Categoria
const categoryBtn = addOptionsList.children[1]
const addCategoryWindow  = document.querySelector(".addCategory");
const saveCategoryBtn = document.querySelector(".v59_248");
const categoriesList = document.querySelector(".listaCategorias");
const categoryField = document.querySelector(".v59_243")

//Editar tarefa
const editTaskWindow = document.querySelector(".editTaskWindow");
const saveChangesBtn = document.querySelector(".v59_212");
//Campos da janela editar tarefa
const editTaskWindowInputs = editTaskWindow.getElementsByTagName("input");
const titleField = editTaskWindowInputs[0];
const descField = editTaskWindowInputs[1];
const day = editTaskWindowInputs[2]
const month = editTaskWindowInputs[3]
const year = editTaskWindowInputs[4]
const category = editTaskWindowInputs[5]

//Container de cards
const containerCards = document.querySelector(".containerCards");



/* EVENT LISTENERS / AÇÕES NA PÁGINA */
addBtn.addEventListener("click", toggleAddOptionsList)

taskBtn.addEventListener("click", toggleAddTaskWindow);
taskBtn.addEventListener("click", toggleAddOptionsList);
saveTaskBtn.addEventListener("click", checkWindowInputs.bind(null, ".addTaskWindow"))

allTasksItem.addEventListener("click", renderAllCards);
allTasksItem.addEventListener("click", function(){ document.querySelector(".opcoesCtg").style.display = "none"});

categoryBtn.addEventListener("click", toggleAddCategoryWindow);
categoryBtn.addEventListener("click", toggleAddOptionsList);
saveCategoryBtn.addEventListener("click", checkWindowInputs.bind(null, ".addCategory"));
8





/******* FUNÇÕES ******/

//Exibe ou esconde lista de opções do botão adicionar
function toggleAddOptionsList(){
    var style = addOptionsList.style;
    if(style.display === "block"){
        style.display = "none";
    } else {
        style.display = "block";
    }
}
/* 
 * Valida campos da janela
 * Aceita como argumento a string da classe da janela iniciado com o ponto, exemplo: .addTaskWindow 
 * Parametro id é opcional. É o id de algum card. usado apenas na edição de tarefas.
 */
function checkWindowInputs(className, id){
    console.log("Checando inputs");
    const reference = document.querySelector(className);
    const windowInputs = reference.getElementsByTagName("input");    

    //se for janela de add categoria
    if(className == ".addCategory"){
        const category = windowInputs[0].value.trim()
        if (category == ""){
        alert("Nome da categoria não pode ser vazio!")
        } else{
            var xhr = new XMLHttpRequest();
            xhr.open("GET", baseUrl + "/category" + "/" + category, true); 
            xhr.responseType = "json"; 
            xhr.onload = function(){ 
                if (xhr.status === 200){
                    console.log("Dados recebidos com sucesso");
                    checkCategory(xhr.status, xhr.response, category, className)
                } else {
                    console.warn("Algo deu errado. Erro " + xhr.status);
                }
            }
            xhr.send(); 
        }
    }
    //outras janelas (adicionar ou editar tarefa)
    else{
        const category = windowInputs[5].value.trim();
        if (windowInputs[0].value.trim() == ""){
            alert("Título não pode ser vazio!")
            isValid = false

        } else if (windowInputs[2].value.trim() == ""){
            alert("Dia não pode ser vazio!")
            isValid = false

        } else if (windowInputs[3].value.trim() == ""){
            alert("Mês não pode ser vazio!")
            isValid = false

        } else if (windowInputs[4].value.trim() == ""){
            alert("Ano não pode ser vazio!")
            isValid = false
        } else if (category != ""){
            var xhr = new XMLHttpRequest();
            xhr.open("GET", baseUrl + "/category" + "/" + category, true); 
            xhr.responseType = "json"; 
            xhr.onload = function(){ 
                if (xhr.status === 200){
                    console.log("Dados recebidos com sucesso");
                    checkCategory(xhr.status, xhr.response, category, className, id)
                } else {
                    console.warn("Algo deu errado. Erro " + xhr.status);
                }
            }
            xhr.send(); 
        }
        //Todos os testes passaram e categoria é vazia
        else {
            if(className == ".addTaskWindow"){
                sendTask()
            } else if(className == ".editTaskWindow"){
                saveChanges(id)
            } else {
                console.log("fim")
            }
        }
    }    
}

/* Checa se a categoria existe
 * windowClassName: string da classe da janela que chamou, iniciado com ponto
 * category: categoria a ser checada
 * id: Opcional. É o id de algum card. usado apenas na edição de tarefas.
 */
function checkCategory(status, response, category, windowClassName, id){
    console.log("Checando categoria")
    console.log("Janela: " + windowClassName)
    console.log("Categoria:" + category)
    
    //Se for adicionar categoria
    if(windowClassName == ".addCategory"){
        console.log(response)
        //Checa se já existe categoria igual
        if(response != null){
            alert("Já existe categoria com esse nome!")
        } else {
            sendCategory()
        }
    }
    //Se for editar categoria
    else if(windowClassName == ".editCategory"){
        console.log(response)
        
        if(category.trim() == ""){
            alert("Categoria não pode ser vazio!")
        }
        //Checa se já existe categoria igual
        else if(response != null){
            alert("Já existe categoria com esse nome!")
        } else {
            updateCategory(category)
        }
    }
    //Se for adicionar/editar tarefa
    //Se categoria não existe, exibe alerta
    //Se existe, identifica qual janela chamou e chama a função respectiva
    else if(response == null){
        alert("Categoria não existe!")
    } else {
        if(windowClassName == ".editTaskWindow"){
            saveChanges(id)
        } else if(windowClassName == ".addTaskWindow"){
            sendTask()
        }
    }
}

/* Limpa os campos da janela
 * O argumento aceito é igual ao do checkWindowInputs()
 */
function clearWindowInputs(className){
    const reference = document.querySelector(className);
    const windowInputs = reference.getElementsByTagName("input");
    for(var input of windowInputs){
        input.value = ''
    }
}




/**** CARDS ****/
//Renderiza todos os cards
function renderAllCards(){
    tituloSecao.textContent = "Todas as tarefas"
    containerCards.innerHTML = ""
    callAPI(baseUrl + '/tasks', 'GET', renderCards)
}
//Recebe dados de cards e os renderiza
function renderCards(status, data){
    //Faz uma iteração pelo array recebido chamando o renderNewCard
    //passando o dado atual
    console.log("Status: " + status)
    console.log(data)
    for(var task of data){
        if(task.title != "category"){
            renderNewCard(task)
        }
    }
}
//Renderiza um novo card na exibição com base no objeto passado
function renderNewCard(data){
    //dados do objeto recebido
    const id = data._id
    const title = data.title
    const description = data.description
    const category = data.category
    const date = data.date.split("/")
    const day = date[0]
    const month = monthToText(date[1])
    const hour = data.hour
    const isCompleted = data.completed
    
    var card = document.createElement("div")
    var content =  "<div>";
    content += `<div class="card" id="${id}">`
    content += '<div class="cardFundo"></div>'
    content += '<img class="cardCor" src="./img/card_color.png"/>'
    content += `<div class="opcoesCard font-class-3 border-class-1">...</div>`
    content += `<div class="dataCard font-class-1 border-class-1">${day}<br />${month}</div>`
    content += `<div class="tituloCard font-class-2 border-class-1">${title}</div>`
    content += `<div class="descricaoCard font-class-1 border-class-1">${description}</div>`
    content += '<ul class="listaOpcoes font-class-1"> <li>Editar</li><li>Remover</li></ul>'
    content += '</div>';
    card.innerHTML = content;
    
    const cardOptionsBtn = card.querySelector(".opcoesCard"); //referencia ao botao de opcoes
    const cardOptionsList = card.querySelector(".listaOpcoes"); //referencia a lista de opcoes
    
    cardOptionsBtn.onclick = toggleCardOptions.bind(null,id); //abre a lista de opcoes
    
    cardOptionsList.children[0].onclick = editTaskHandler.bind(null, id) //ao clicar em "editar" abre a janela
    cardOptionsList.children[1].onclick = deleteTaskHandler.bind(null, id) // deleta card ao clicar no botao    
    containerCards.appendChild(card)
}
//Converte mes de numero para em texto abreviado
function monthToText(month){
    switch(month){
        case "1": return "jan"; break;
        case "2": return "fev"; break;
        case "3": return "mar"; break;
        case "4": return "abr"; break;
        case "5": return "mai"; break;
        case "6": return "jun"; break;
        case "7": return "jul"; break;
        case "8": return "ago"; break;
        case "9": return "set"; break;
        case "10": return "out"; break;
        case "11": return "nov"; break;
        case "12": return "dez"; break;
    }
}
//Exibe ou esconde opções do card
function toggleCardOptions(id){
    var style = document.getElementById(id).querySelector(".listaOpcoes").style;
    if(style.display === "block"){
        style.display = "none";
    } else {
        style.display = "block";
    }
}




/**** TAREFA ****/
//Exibe ou esconte janela de add tarefa
function toggleAddTaskWindow() {
    var style = addTaskWindow.style;
    if(style.display === "block"){
        style.display = "none";
    } else {
        style.display = "block";
    }
}
/*Pega os dados dos inputs da janela de add tarefa, 
 *cria um objeto com esses dados, envia o objeto 
 *para o servidor e fecha a janela
*/
function sendTask(){
    const category = addTaskWindow.querySelector(".categoriaCampo").value
    const descr = addTaskWindow.querySelector(".descCampo").value
    const title = addTaskWindow.querySelector(".tituloCampo").value
    const day = addTaskWindow.querySelector(".diaCampo").value
    const month = addTaskWindow.querySelector(".mesCampo").value
    const year = addTaskWindow.querySelector(".anoCampo").value
    const fullDate = day + "/" + month + "/" + year;

    const task = {
        title: title,
        description: descr,
        category: category,
        date: fullDate,
        hour: null,
        completed: false
    }

    console.log(task)
    callAPI(baseUrl + '/tasks', 'POST', function(){
        console.log("Status: " + status)
    }, task)
    toggleAddTaskWindow();
    clearWindowInputs(".addTaskWindow")
    renderAllCards()
    callAPI(baseUrl, 'GET', renderCategoriesList)
}
//Obtem tarefas de uma categoria específica
function getTasksByCategory(category){
    var tasks = []
    callAPI(baseUrl + "/" + "tasks" + "/" + category , "GET", function(status, response){
        for(var t of response){
            tasks.push(t)
        }
    })
    return tasks
}



/**** EDITAR TAREFA ****/
//Editar tarefa
function editTaskHandler(id){
    toggleCardOptions(id)
    callAPI(baseUrl + "/tasks" + "/" + "id" + "/" + id, "GET", updateEditWindow)
    console.log("ID selecionado: " + id)    
    toggleEditTaskWindow();
}
/*Atualiza o conteúdo da janela de editar com o conteúdo da
 *tarefa selecionada*/
function updateEditWindow(status, response){
    const fullDate = response.date.split("/");
    
    //campos da janela recebendo informacoes do obj recebido
    titleField.value = response.title;
    descField.value = response.description;
    day.value = fullDate[0];
    month.value = fullDate[1];
    year.value = fullDate[2];
    category.value = response.category;
    
    console.log(response)
    saveChangesBtn.onclick = checkWindowInputs.bind(null, ".editTaskWindow", response._id);
}
//Exibe ou esconde janela de editar tarefa
function toggleEditTaskWindow(){
    var style = editTaskWindow.style;
    if(style.display === "block"){
        style.display = "none";
    } else {
        style.display = "block";
    }
}
//Atualiza a tarefa e a envia ao servidor
function saveChanges(id){
    callAPI(baseUrl + "/tasks" + "/" + "id" + "/" + id, "GET", function(status, response){
        console.log("Save Changes")
        console.log("id: " + id)
        console.log(response)
        //Atualizando os dados da tarefa pelos dados dos campos
        
        var task = response
        
        const taskId = task._id;
        task.title = titleField.value
        task.description = descField.value
        task.category = category.value
        task.date = day.value + "/" + month.value + "/" + year.value

        console.log(task)

        clearWindowInputs(".editTaskWindow")
        callAPI(baseUrl + "/tasks" + "/id" + "/" + id, "PUT", function(status, response){
            console.log(response);
            toggleEditTaskWindow();
            renderAllCards();
        }, task)  
    }) 
}




/**** DELETAR TAREFA ****/
function deleteTaskHandler(id){
    callAPI(baseUrl + "/tasks" + "/" + "id" + "/" + id, "DELETE", function(){
        console.log("DELETE - Status: " + status);
    })
    renderAllCards()
}




/**** CATEGORIA ****/

//retorna uma categoria
function getCategory(name){
    ctg = ""
    callAPI(baseUrl + "/category" + "/" + name, 'GET', function(status, response){
        if(response == null){
            ctg = response
        }
    })
    
    return ctg
}

//Retorna todas as categorias
function getAllCategories(){
    //armazena as categorias
    categoriesArray = [] 
    callAPI(baseUrl + "/category", 'GET', function(status, response){
        for(var c of response){
            categoriesArray.push(c.name);
        }
    })
    return categoriesArray
}

//Exibe ou esconde janela de add categoria
function toggleAddCategoryWindow(){
    var style = addCategoryWindow.style;
    if(style.display === "block"){
        style.display = "none";
    } else {
        style.display = "block";
    }
}

//Envia a categoria e fecha a janela
function sendCategory(){
    const category = {
        name: categoryField.value
    }
    callAPI(baseUrl + "/category", 'POST', function(status, response){
        console.log(response)
    }, category);
    toggleAddCategoryWindow(); 
    clearWindowInputs(".addCategory")
    callAPI(baseUrl, 'GET', renderCategoriesList)
}
//Atualiza a lista lateral com as categorias existentes
function renderCategoriesList(){
    categoriesList.innerHTML = ""
    callAPI(baseUrl + "/category", 'GET', function(status, categories){
        //itera pelo array recebido e renderiza os itens
        for(var cat of categories){
            if(cat.name != null){
                const item = document.createElement("li")
                item.textContent = cat.name;
                item.onclick = renderByCategory.bind(null, cat.name);
                categoriesList.appendChild(item);                
            }
        }
    })    
}
//Exibe cards da categoria informada
function renderByCategory(category){
    document.querySelector(".opcoesCtg").style.display = "flex"
    containerCards.innerHTML = ""
    const opcoesCtgEdit = document.querySelector(".opcoesCtgEdit");
    const opcoesCtgRemove = document.querySelector(".opcoesCtgRemove");
    opcoesCtgEdit.onclick = toggleEditCategoryWindow.bind(null, category)
    opcoesCtgRemove.onclick = deleteCategory.bind(null, category)
    
    tituloSecao.innerHTML = category;
    console.log(category)
    callAPI(baseUrl + "/" + "tasks" + "/" + category , "GET", function(status, response){
        for(var t of response){
            renderNewCard(t)
        }
    })
}

function toggleEditCategoryWindow(category){
    const editCtgWindow = document.querySelector(".editCategory");
    var style = editCtgWindow.style;
    if(style.display == "block"){
        style.display = "none"
    } else {
        const input = editCtgWindow.getElementsByTagName("input")[0]
        input.value = category;
        const saveCtgBtn = editCtgWindow.querySelector(".v59_249");
        saveCtgBtn.onclick = editCategory
        style.display = "block"
    }
}

//Chama o checkCategory() passando o conteúdo do input da janela
//É tipo um intermediário que pede uma checagem antes de enviar a categoria
function editCategory(){
    const editCtgWindow = document.querySelector(".editCategory");
    const input = editCtgWindow.getElementsByTagName("input")[0]
    const category = input.value;
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", baseUrl + "/category" + "/" + category, true); 
    xhr.responseType = "json"; 
    xhr.onload = function(){ 
        if (xhr.status === 200){
            console.log("Dados recebidos com sucesso");
            checkCategory(xhr.status, xhr.response, category, ".editCategory")
        } else {
            console.warn("Algo deu errado. Erro " + xhr.status);
        }
    }
    xhr.send(); 
}

//Atualiza a categoria
function updateCategory(newName){
    const oldName = tituloSecao.textContent
    console.log("CATEGORIA A ALTERAR: " + oldName)
    console.log("NOVA CATEGORIA: " + newName)
    const newCategory = {name: newName}
    callAPI(baseUrl + "/category" + "/" + oldName, "PUT", function(status, response){
        clearWindowInputs(".editCategory")
        toggleEditCategoryWindow()
        renderAllCards()
        renderCategoriesList()
    }, newCategory)
    
}
function deleteCategory(category){
     callAPI(baseUrl + "/category" + "/" + category, "DELETE", function(status, response){
         console.log("DELETAR CATEGORIA")
         console.log("STATUS: " + status)
         renderAllCards()
         renderCategoriesList()
     })
}



/****** FUNÇÕES - Backend ******/
//Faz as requisicoes HTTP
function callAPI(url, method, callback, data){
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open(method, url, true); 
    if (method == 'POST' || method == 'PATCH' || method == 'PUT'){
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    }
    xhr.onload = function(){
        callback(xhr.status, xhr.response);
    }
    if(data){
        xhr.send(JSON.stringify(data));
    } else {
    xhr.send();
    }
}

