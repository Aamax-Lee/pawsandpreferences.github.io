import { createContext, useState, useContext, useEffect } from "react";

const CatContext = createContext();

export const useCatContext = () => useContext(CatContext);

export const CatProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const [catsScrolled, setCatsScrolled] = useState(0);

  useEffect(() => {
    const storedFavs = localStorage.getItem("favourites");
    if (storedFavs) {
      setFavourites(JSON.parse(storedFavs));
    }

    const storedScrolled = localStorage.getItem("catsScrolled");
    if (storedScrolled) {
      setCatsScrolled(JSON.parse(storedScrolled));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    localStorage.setItem("catsScrolled", JSON.stringify(catsScrolled));
  }, [catsScrolled]);

  const addToScrolled = () => {
    setCatsScrolled((prev) => prev + 1);
  }

  const addToFavourites = (cat) => {
    setFavourites((prev) => [...prev, cat]);
  };

  const removeFromFavourites = (catId) => {
    setFavourites((prev) => prev.filter((cat) => cat.id !== catId));
  };

  const isFavourite = (catId) => {
    return favourites.some((cat) => cat.id === catId);
  };

  const reorderFavourites = (newOrder) => {
    setFavourites(newOrder);
  };

  const value = {
    favourites,
    addToFavourites,
    removeFromFavourites,
    isFavourite,
    reorderFavourites,
    addToScrolled,
    catsScrolled,
  };

  return <CatContext.Provider value={value}>{children}</CatContext.Provider>;
};
