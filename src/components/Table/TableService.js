const numberSort = (a, b) => a - b;
const stringSort = (a, b) => a.localeCompare(b);

export const sortData = (column, direction, data) => {
  switch (column) {
    case "latitude":
      const sortedLat = data.sort((a, b) =>
        numberSort(a.latLng[0], b.latLng[0])
      );
      return direction === "desc" ? sortedLat : sortedLat.reverse();
    case "longitude":
      const sortedLang = data.sort((a, b) =>
        numberSort(a.latLng[1], b.latLng[1])
      );
      return direction === "desc" ? sortedLang : sortedLang.reverse();
    case "population":
      const sortedPop = data.sort((a, b) =>
        numberSort(a.population, b.population)
      );
      return direction === "desc" ? sortedPop : sortedPop.reverse();
    default:
      const sorted = data.sort((a, b) => stringSort(a[column], b[column]));
      return direction === "desc" ? sorted : sorted.reverse();
  }
};
