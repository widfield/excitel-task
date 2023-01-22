import { api } from "../../api/api";

export const debounce = (func) => {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, 450);
  };
};

export const getCountries = (value, setCountries, setIsLoading) => {
  setIsLoading(true);
  if (value) {
    fetch(`${api}/countries/${value}`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setCountries(JSON.parse(data.contents).slice(0, 10));
      });
  } else {
    setCountries([]);
    setIsLoading(false);
  }
};
