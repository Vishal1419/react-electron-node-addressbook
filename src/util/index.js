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

export const getBase64 = file => (
  new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = resolve;
    reader.onerror = reject;
  })
);
