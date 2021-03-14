let arr = new Array();

let favoritos = new Array();

let toDelete = new Array();

if (typeof document !== "undefined") {
  getJson();
  updateIcons();
}

async function getJson() {
  let url =
    "https://gist.githubusercontent.com/jhonatan89/719f8a95a8dce961597f04b3ce37f97b/raw/4b7f1ac723a14b372ba6899ce63dbd7c2679e345/products-ecommerce";
  await fetch(url).then(function (response) {
    response.json().then(function (json) {
      json = json.items;
      arr = json;
      updateMain(arr);
    });
  });
}

//MAIN
function updateMain(json) {
  const body = document.getElementById("main");
  for (let i = 0; i < json.length; i++) {
    let obj = json[i];

    const div1 = document.createElement("div");
    div1.className = "container carta";
    //MAIN
    const image = document.createElement("img");
    image.src = obj.picture;
    image.className = "phone";
    image.alt = "product";

    const div2 = document.createElement("div");
    div2.className = "price";
    div2.textContent = numberFormat(obj.price.amount);

    const image2 = document.createElement("img");
    image2.src = "/images/carroverde.png";
    image2.className = "green_icon";
    image2.alt = "free_shipping";
    //MAIN
    const div3 = document.createElement("div");
    div3.className = "city";
    div3.textContent = obj.location;

    const div4 = document.createElement("div");
    div4.className = "product_name";
    div4.textContent = obj.title;
    //MAIN
    div1.appendChild(image);
    div1.appendChild(div2);
    if (obj.free_shipping === true) {
      div1.appendChild(image2);
    }
    div1.appendChild(div3);
    div1.appendChild(div4);
    body.appendChild(div1);

    //MAIN
    div1.addEventListener("click", function () {
      let object = getObject(json, obj.id);
      deleteMain();
      updateDetail(object);
    });
  }
}
//DETAIL
function updateDetail(obj) {
  const bread = document.getElementById("breadcrumb");

  const nav = document.createElement("nav");

  const ol = document.createElement("ol");
  ol.className = "breadcrumb";

  for (let i = 0; i < obj.categories.length; i++) {
    const li = document.createElement("li");
    li.className = "breadcrumb-item";
    li.textContent = obj.categories[i];
    ol.appendChild(li);
  }
  nav.appendChild(ol);

  bread.appendChild(nav);

  const body = document.getElementById("detail");

  //DETAIL
  const image = document.createElement("img");
  image.src = obj.picture;
  image.className = "bigimage";
  image.alt = "product";

  const div1 = document.createElement("div");
  div1.className = "UsadosVendidos";
  let text = "";
  if (obj.condition == "new") {
    text = "Nuevo | " + obj.sold_quantity + " vendidos";
  } else {
    text = "Usado | " + obj.sold_quantity + " vendidos";
  }
  div1.textContent = text;

  const div2 = document.createElement("div");
  div2.className = "product_name_Detail";
  div2.textContent = numberFormat(obj.title);

  const div3 = document.createElement("div");
  div3.className = "price_Detail";
  div3.textContent = numberFormat(obj.price.amount);
  //DETAIL
  const div4 = document.createElement("div");
  div4.className = "descriptionTitle";
  div4.textContent = "Descripción del producto";

  const div5 = document.createElement("div");
  div5.className = "Comprar";

  div5.addEventListener("click", function () {
    updatePopUp(obj);
  });
  //DETAIL
  const div6 = document.createElement("div");
  div6.className = "textComprar";
  div6.textContent = "Comprar";

  div5.appendChild(div6);

  const div7 = document.createElement("div");
  div7.className = "AnadirFavoritos";

  //DETAIL
  const div8 = document.createElement("div");
  div8.className = "textComprar";
  div8.textContent = "Añadir Favoritos";
  //DETAIL
  div7.appendChild(div8);

  div7.addEventListener("click", function () {
    let status = findFavorite(obj.id);
    if (status == false) {
      addFavorite(obj);
      div8.textContent = "Quitar de Favoritos";
    } else {
      deleteFavorite(obj.id);
      div8.textContent = "Añadir Favoritos";
    }
  });

  const div9 = document.createElement("div");
  div9.className = "description";
  div9.textContent = obj.description;
  //DETAIL
  body.appendChild(image);
  body.appendChild(div1);
  body.appendChild(div2);
  body.appendChild(div3);
  body.appendChild(div4);
  body.appendChild(div5);
  body.appendChild(div7);
  body.appendChild(div9);
  //DETAIL
}

function updatePopUp(obj) {
  const body = document.getElementById("popUp");

  const div = document.createElement("div");
  div.className = "popUpMessage";
  //POPUP

  const div1 = document.createElement("div");
  div1.className = "popUpName";
  div1.textContent = obj.title;
  //POPUP
  const div2 = document.createElement("div");
  div2.className = "popUpText";
  div2.textContent = "Añadido al carrito de compras";
  //POPUP
  const div3 = document.createElement("div");
  div3.className = "division";

  //POPUP
  const hr = document.createElement("hr");

  div3.appendChild(hr);

  //POPUP
  const div4 = document.createElement("div");
  div4.className = "close";

  const div5 = document.createElement("div");
  div5.className = "textClose";
  div5.textContent = "Close";

  div4.appendChild(div5);
  //POPUP
  div4.addEventListener("click", function () {
    deletePopUp();
  });
  //POPUP;
  div.appendChild(div1);
  div.appendChild(div2);
  div.appendChild(div3);
  div.appendChild(div4);
  body.appendChild(div);
  //POPUP
}

function updatePopUp2() {
  const body = document.getElementById("popUp2");

  const div = document.createElement("div");
  div.className = "popUpMessage";
  //POPUP2

  const div1 = document.createElement("div");
  div1.className = "popUpName";
  div1.textContent = "No hay resultados para su búsqueda!";
  //POPUP2
  const div2 = document.createElement("div");
  div2.className = "popUpText";
  div2.textContent = "Intente buscar por otra categoría";
  //POPUP2
  const div3 = document.createElement("div");
  div3.className = "division";

  //POPUP2
  const hr = document.createElement("hr");

  div3.appendChild(hr);

  //POPUP2
  const div4 = document.createElement("div");
  div4.className = "close";

  const div5 = document.createElement("div");
  div5.className = "textClose";
  div5.textContent = "Close";

  div4.appendChild(div5);
  //POPUP2
  div4.addEventListener("click", function () {
    deletePopUp2();
    updateMain(arr);
  });
  //POPUP2;
  div.appendChild(div1);
  div.appendChild(div2);
  div.appendChild(div3);
  div.appendChild(div4);
  body.appendChild(div);
  //POPUP2
}

function updateFavorites(json) {
  const favmenu = document.getElementById("favmenu");
  const div1 = document.createElement("div");
  div1.className = "tituloFavoritos";
  div1.textContent = "Favoritos";
  const div2 = document.createElement("div");
  div2.className = "FavoriteBar";
  const div3 = document.createElement("div");
  div3.className = "checkContainer";
  div3.id = "checkContainer";

  div3.addEventListener("click", function () {
    const checks = document.getElementsByClassName(
      "checkContainer checkContainer2"
    );
    for (let i = 0; i < checks.length; i++) {
      check = checks[i];
      check.click();
    }
  });
  //FAVORITES

  const div4 = document.createElement("div");
  div4.className = "mediumButton grey TopFavoriteBotton";
  div4.id = "TopFavoriteBotton";

  div4.addEventListener("click", function () {
    if (
      div4.className.localeCompare("mediumButton red TopFavoriteBotton") == 0
    ) {
      emptyDeletesAndFavorites();
      deleteFavorites();
      updateFavorites(favoritos);
    }
  });

  //FAVORITES
  const div5 = document.createElement("div");
  div5.className = "mediumButtonText";
  div5.textContent = "Eliminar";
  //FAVORITES
  div4.appendChild(div5);

  div2.appendChild(div3);
  div2.appendChild(div4);
  //FAVORITES
  favmenu.appendChild(div1);
  favmenu.appendChild(div2);

  const body = document.getElementById("favlist");
  for (let i = 0; i < json.length; i++) {
    let obj = json[i];
    //FAVORITES
    const div1 = document.createElement("div");
    div1.className = "container carta";

    const div7 = document.createElement("div");
    div7.className = "checkContainer checkContainer2";

    div7.addEventListener("click", function () {
      if (findToDelete(obj.id)) {
        deleteToDelete(obj.id);
        div7.innerHTML = "";
      } else {
        addToDelete(obj);
        const imagecheck = document.createElement("img");
        imagecheck.src = "./images/checkIcon.png";
        imagecheck.className = "check";
        imagecheck.alt = "check";
        //FAVORITES
        div7.appendChild(imagecheck);

        if (toDelete.length === 1) {
          const check = document.getElementById("checkContainer");
          const image1 = document.createElement("img");
          image1.src = "./images/checkIcon.png";
          image1.className = "check";
          image1.alt = "check";
          //FAVORITES
          check.appendChild(image1);

          const button = document.getElementById("TopFavoriteBotton");
          button.className = "mediumButton red TopFavoriteBotton";
        }
      }
      if (toDelete.length === 0) {
        const check = document.getElementById("checkContainer");
        check.innerHTML = "";
        const button = document.getElementById("TopFavoriteBotton");
        button.className = "mediumButton grey TopFavoriteBotton";
      }
    });

    //FAVORITES
    const image = document.createElement("img");
    image.src = obj.picture;
    image.className = "phone2";
    image.alt = "product";
    //FAVORITES
    const div2 = document.createElement("div");
    div2.className = "price";
    div2.textContent = numberFormat(obj.price.amount);
    //FAVORITES
    const image2 = document.createElement("img");
    image2.src = "/images/carroverde.png";
    image2.className = "green_icon2";
    image2.alt = "free_shipping";
    //FAVORITES
    const div3 = document.createElement("div");
    div3.className = "city";

    const div4 = document.createElement("div");
    div4.className = "product_name";
    div4.textContent = obj.title;

    const div5 = document.createElement("div");
    div5.className = "mediumButton pink FavoriteBottom";

    const div6 = document.createElement("div");
    div6.className = "mediumButtonText";
    div6.textContent = "Ver Artículo";

    div5.appendChild(div6);

    //FAVORITES
    div1.appendChild(div7);
    div1.appendChild(image);
    div1.appendChild(div2);
    if (obj.free_shipping === true) {
      div1.appendChild(image2);
    }
    div1.appendChild(div3);
    div1.appendChild(div4);
    div1.appendChild(div5);
    body.appendChild(div1);

    favmenu.appendChild(body);

    //FAVORITES
    div5.addEventListener("click", function () {
      let object = getObject(json, obj.id);
      deleteFavorites();
      updateDetail(object);
    });
  } //FAVORITES
}

function getObject(json, number) {
  for (let i = 0; i < json.length; i++) {
    let obj = json[i];
    if (obj.id.localeCompare(number) == 0) {
      return obj;
    }
  }
}

function updateIcons() {
  const fav = document.getElementById("fav");
  fav.addEventListener("click", function () {
    deleteMain();
    deleteDetail();
    deleteBreadCrumb();
    deletePopUp();
    deletePopUp2();
    deleteFavorites();
    updateFavorites(favoritos);
  });
  const logo = document.getElementById("logo");
  logo.addEventListener("click", function () {
    deleteMain();
    deleteDetail();
    deleteBreadCrumb();
    deleteFavorites();
    deletePopUp();
    deletePopUp2();
    getJson();
  });
  lupa = document.getElementById("submit");
  lupa.addEventListener("click", function () {
    filterProducts();
  });
}

function deleteMain() {
  const body = document.getElementById("main");
  body.innerHTML = "";
}

function deleteDetail() {
  const body = document.getElementById("detail");
  body.innerHTML = "";
}

function deleteBreadCrumb() {
  const body = document.getElementById("breadcrumb");
  body.innerHTML = "";
}

function deleteFavorites() {
  const body = document.getElementById("favlist");
  body.innerHTML = "";
  const body2 = document.getElementById("favmenu");
  const section = document.createElement("section");
  section.className = "container cartas2";
  section.id = "favlist";
  body2.innerHTML = "";
  body2.appendChild(section);
}

function deletePopUp() {
  const body = document.getElementById("popUp");
  body.innerHTML = "";
}

function deletePopUp2() {
  const body = document.getElementById("popUp2");
  body.innerHTML = "";
}

function numberFormat(x) {
  x = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  x = "$ " + x;
  return x;
}

function deleteFavorite(id) {
  for (let i = 0; i < favoritos.length; i++) {
    if (favoritos[i].id == id) {
      favoritos.splice(i, 1);
      return true;
    }
  }
  return false;
}

function addFavorite(obj) {
  favoritos.push(obj);
}

function findFavorite(id) {
  for (let i = 0; i < favoritos.length; i++) {
    if (favoritos[i].id.localeCompare(id) === 0) {
      return true;
    }
  }
  return false;
}

function deleteToDelete(id) {
  for (let i = 0; i < toDelete.length; i++) {
    if (toDelete[i].id == id) {
      toDelete.splice(i, 1);
      return true;
    }
  }
  return false;
}

function addToDelete(obj) {
  toDelete.push(obj);
}

function findToDelete(id) {
  for (let i = 0; i < toDelete.length; i++) {
    if (toDelete[i].id.localeCompare(id) === 0) {
      return true;
    }
  }
  return false;
}

function emptyDeletesAndFavorites() {
  for (let i = 0; i < toDelete.length; i++) {
    if (findFavorite(toDelete[i].id)) {
      deleteFavorite(toDelete[i].id);
    }
  }
  toDelete.length = 0;
}

function filterProducts() {
  let text = document.getElementById("filter").value;

  arr2 = new Array();

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].categories.includes(text)) {
      arr2.push(arr[i]);
    }
  }
  deleteMain();
  deleteDetail();
  deleteBreadCrumb();
  deleteFavorites();
  deletePopUp();
  if (arr2.length == 0) {
    updatePopUp2();
  } else {
    updateMain(arr2);
  }
}
