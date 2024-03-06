
export const addFav = (state, action) => {
  const isAlreadyAdded = state.favorites.some(
    (favorite) => favorite.id === action.payload.id
  );
  if (!isAlreadyAdded) {
    const newFavorites = [...state.favorites, action.payload];
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    console.log("Agregado a favoritos:", newFavorites);
    return { ...state, favorites: newFavorites };
  } else {
    console.log("Esta tarjeta ya está en favoritos");
    return state;
  }
};

export const setSession = (state, action) => {
  return { ...state, session: action.payload };
};

export const closeSession = (state) => {
  return { ...state, session: {} };
};


