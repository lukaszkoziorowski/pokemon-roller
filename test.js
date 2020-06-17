const render = (e) => {
  e.preventDefault();
  const pokeball = document.querySelector(".roller__pokeball-img");
  pokeball.style.opacity = "1";
  const newPokemon = document.querySelector(".roller__new-pokemon");
  newPokemon.remove();
  document.querySelector(".btn-wrapper").remove();
  const rollForm = document.createElement("form");
  rollForm.className = "generator";
  rollForm.innerHTML = `<input type='submit' class='btn roller-btn' value='Roll'/>`;
};
