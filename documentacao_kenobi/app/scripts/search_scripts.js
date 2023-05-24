const searchWrapper = document.querySelector(".search");
const inputBox = searchWrapper.querySelector("input");
const sugestBox = searchWrapper.querySelector(".list");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

const opcoes = [
    "index Kenobi",
    "Dashboard",
    "Formularios",
    "Funcionarios",
    "Relatorio do almoco",
    "Usuarios",
    "Menu",
    "Criacao de usuario",
    "Recursos realtime",
    "Dados dos empenhos",
    "Relatorio dos empenhos",
];
let opcoesalt = opcoes;

inputBox.onfocus = () => {
    console.log("@@@")
    let opcoesTeste = opcoesalt.map((data) => {
        // passing return data inside li tag
        return data = `<li>${data}</li>`;
    });
    searchWrapper.classList.add("active");
    showSuggestions(opcoesTeste);

    let allList = sugestBox.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
        //adding onclick attribute in all li tag
        allList[i].setAttribute("onMouseDown", "select(this)");
    }
}

inputBox.onblur = () => {
    searchWrapper.classList.remove("active");
}

opcoesalt = opcoes;

inputBox.onkeyup = (e) => {
    let userData = e.target.value; //user enetered data
    let emptyArray = opcoes;

    if (e.key === 'Enter') {
        if (userData) {
            console.log('@@')
            let dadoPesquisa = userData.replace(/\s+/g, '');
            window.open(`http://localhost/documentacao_vini_luiza/documentacao_kenobi/app/${dadoPesquisa}.html`, '_self');
        }
    }

    if (userData == '') {

        emptyArray.filter((data) => {
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });

        emptyArray = emptyArray.map((data) => {
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });

        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);

        let allList = sugestBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onMouseDown", "select(this)");
        }

        if (e.key === 'Escape') {
            searchWrapper.classList.remove("active");
        }

    } else {
        if (userData) {
            icon.onclick = () => {
                let dadoPesquisa = userData.replace(/\s+/g, '');
                webLink = `http://localhost/documentacao_vini_luiza/documentacao_kenobi/app/${dadoPesquisa}.html`;
                linkTag.setAttribute("target", '_self');
                linkTag.setAttribute("href", webLink);
                linkTag.click();
            }
            emptyArray = emptyArray.filter((data) => {
                //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
                return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
            });
            emptyArray = emptyArray.map((data) => {
                // passing return data inside li tag
                return data = `<li>${data}</li>`;
            });
            searchWrapper.classList.add("active"); //show autocomplete box
            showSuggestions(emptyArray);
            let allList = sugestBox.querySelectorAll("li");
            for (let i = 0; i < allList.length; i++) {
                //adding onclick attribute in all li tag
                allList[i].setAttribute("onMouseDown", "select(this)");
            }

            if (e.key === 'Escape') {
                searchWrapper.classList.remove("active");
            }
        } else {
            searchWrapper.classList.remove("active"); //hide autocomplete box
        }
    }
}

function select(element) {
    let selectData = element.textContent;
    let dadoPesquisa = selectData.replace(/\s+/g, '');
    inputBox.value = selectData;
    icon.onclick = () => {
        webLink = `http://localhost/documentacao_vini_luiza/documentacao_kenobi/app/${dadoPesquisa}.html`;
        linkTag.setAttribute("target", '_self');
        linkTag.setAttribute("href", webLink);
        linkTag.click();
    }
    searchWrapper.classList.remove("active");
}

function showSuggestions(list) {
    let listData;
    console.log(!list.length);
    if (!list.length) {
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    } else {
        listData = list.join('');
    }
    sugestBox.innerHTML = listData;
}