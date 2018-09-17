.reduce(reducer, [])

const reducer =  (alreadyAccumulated, currentBook) => {
  let matchingBook = alreadyAccumulated.find(elem => elem.name === currentBook.name)
  if (matchingBook) {
    matchingBook.cartQuantity++
  } else {
    alreadyAccumulated = [...alreadyAccumulated, {...currentBook, cartQuantity: 1}]
  }
}
