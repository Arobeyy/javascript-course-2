const array = [1, 20, 22, 24, 5, 10];
console.log(array);

function getLastValue(array) {
  const lastIndex = array.length - 1;
  const lastValue = array[lastIndex];
  console.log(lastValue);
}

getLastValue(array);