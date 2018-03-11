export const orderBy = (arr, key, direction = 'asc') => {
    return arr.sort((a, b) => {
      if (direction === 'desc') {
        if (a[key] < b[key]) return 1;
        if (a[key] > b[key]) return -1;
      } else {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
      }
      return 0;
    });
  }