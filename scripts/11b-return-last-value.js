const array = [1, 20, 22, 24, 5, 10];
console.log(array);

function getLastValue(array) {
  const lastIndex = array.length - 1;
  return array[lastIndex];
}

console.log(getLastValue(array));