let amount = 0;
let pokemons = [];

const getPoke = (e) => {
  e.preventDefault();
  document.querySelector(".roller__btn").disabled = true;
  const url = `https://pokeapi.co/api/v2/pokemon-form/${Math.floor(
    Math.random() * 400
  )}`;
  fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("Server status is not 200");
      } else {
        return response.json();
      }
    })
    .then((json) => showPoke(json))
    .then((json) => (json = []));
};

function render() {
  const pokeball = document.querySelector(".roller__pokeball-img");
  pokeball.style.opacity = "1";
  pokeball.classList.remove("animated");
  const newPokemon = document.querySelector(".roller__new-pokemon");
  newPokemon.remove();
  document.querySelector(".btn-wrapper").remove();
  const rollForm = document.createElement("form");
  rollForm.className = "generator";
  rollForm.innerHTML = `<input type='submit' class='btn roller__btn' value='Roll'/>`;
  document.querySelector(".roller__pokemon").appendChild(rollForm);
  rollForm.addEventListener("submit", getPoke);
  if (pokemons.length == 9) {
    document.querySelector(".roller__btn").disabled = true;
    document.querySelector(".roller__btn").style.opacity = "0.7";
  }
  document
    .querySelector(".footer__backpack")
    .addEventListener("click", showBackpack);
  document.querySelector(".footer__backpack").style.opacity = "1";
}

const addNumberBackpack = (poke) => {
  const backpack = document.querySelector(".footer__backpack-amount");
  backpack.style.animation = "0.2s add alternate";
  const singlePoke = { name: poke.name, img: poke.sprites["front_default"] };
  pokemons.push(singlePoke);
  amount = pokemons.length;
  backpack.textContent = amount;
  showBackpack();
  if (pokemons.length == 9) {
    const warning = document.createElement("span");
    warning.className = "footer__warning";
    warning.textContent = "Your backpack is full!";
    document.querySelector(".footer").appendChild(warning);
  }
  render();
};

const showPoke = (poke) => {
  document
    .querySelector(".footer__backpack")
    .removeEventListener("click", showBackpack);
  document.querySelector(".footer__backpack").style.opacity = "0.7";
  const submitBtn = document.querySelector(".roller-btn");

  const pokeball = document.querySelector(".roller__pokeball-img");
  pokeball.style.opacity = "1";
  pokeball.classList.add("animated");

  setTimeout(() => {
    pokeball.style.opacity = "0";
    const roller = document.querySelector(".roller");
    const pokeDiv = document.createElement("div");
    pokeDiv.className = "roller__new-pokemon";
    pokeDiv.innerHTML = `<img class="roller__poke-img" src="${poke.sprites["front_default"]}"/>
  <h3 class="roller__poke-name">${poke.name}</h3>
  `;
    roller.appendChild(pokeDiv);
    document.querySelector(".generator").remove();
    const btnWrapper = document.createElement("section");
    btnWrapper.className = "btn-wrapper";
    btnWrapper.innerHTML = `<button class='btn btn-wrapper__btn-again'>Roll again</button>
    <button class='btn btn-wrapper__btn-backpack'>Add to backpack</button>
    `;
    roller.appendChild(btnWrapper);

    document
      .querySelector(".btn-wrapper__btn-backpack")
      .addEventListener("click", function () {
        addNumberBackpack(poke);
      });
    document
      .querySelector(".btn-wrapper__btn-again")
      .addEventListener("click", render);
  }, 3000);
};

const showBackpack = () => {
  const backpackContent = document.createElement("div");
  backpackContent.className = "modal";
  const backpackTitle = document.createElement("h2");
  const backpackSubtitle = document.createElement("p");
  backpackTitle.className = "modal__backpack-title";
  backpackTitle.textContent = "Backpack";
  backpackSubtitle.className = "modal__backpack-subtitle";
  backpackTitle.appendChild(backpackSubtitle);
  backpackContent.appendChild(backpackTitle);
  const closeBtn = document.createElement("button");
  closeBtn.className = "modal__close-btn";
  closeBtn.textContent = "Close";
  for (let i = 0; i < pokemons.length; i++) {
    const newDiv = document.createElement("div");
    const pokeName = pokemons[i].name;
    const pokeImg = pokemons[i].img;
    newDiv.className = "modal__single-pokemon";
    newDiv.innerHTML = `
    <img src="${pokeImg}" class="modal__poke-img"/>
      <span class="modal__poke-name">${pokeName}</span>
      `;
    const deleter = document.createElement("img");
    deleter.setAttribute("src", "assets/close-red.svg");
    deleter.className = "modal__delete-btn";
    newDiv.appendChild(deleter);
    deleter.addEventListener("click", () => {
      if (pokemons.length == 9)
        document.querySelector(".footer__warning").remove();
      pokemons.splice(i, 1);
      newDiv.remove();
      document.querySelector(".footer__backpack-amount").textContent =
        pokemons.length;
      if (pokemons.length < 9) {
        document.querySelector(".roller__btn").disabled = false;
        document.querySelector(".roller__btn").style.opacity = "1";
        // document.querySelector(".footer__warning").remove();
      }
    });

    backpackContent.appendChild(newDiv);
  }

  backpackContent.appendChild(closeBtn);
  document.body.appendChild(backpackContent);
  let screenSize = window.innerWidth;
  document.querySelector(".modal__close-btn").addEventListener("click", () => {
    if (
      screenSize < 1024
        ? (backpackContent.style.animation = "1s slideOut both")
        : (backpackContent.style.animation = "1s slideOutDesktop both")
    )
      setTimeout(() => {
        backpackContent.remove();
      }, 1000);
  });
};

document.querySelector(".generator").addEventListener("submit", getPoke);

document
  .querySelector(".footer__backpack")
  .addEventListener("click", showBackpack);
