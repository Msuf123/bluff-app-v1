export default function formatArrayForDisplay(allData, cardsPerRow) {
  let a = allData;
  let index = 0;
  let result = [];

  while (index < a.length) {
    let arrayToPush = a.slice(index, index + cardsPerRow);
    result.push(arrayToPush);
    index += cardsPerRow;
  }

  return result;
}
