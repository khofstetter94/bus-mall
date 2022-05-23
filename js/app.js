'use strict';

console.log('Are we live?');

// ************** Global Variables ***************

let voteCount = 25;
let allProducts = [];

// ************** DOM References *****************

let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let viewResultsBtn = document.getElementById('view-results-btn');
let resultsList = document.getElementById('results-list');

// ************** Constructor ********************

function Product(name, fileExtension = 'jpg'){
  this.name = name;
  this.views = 0;
  this.votes = 0;
  this.photo = `img/${name}.${fileExtension}`;

  allProducts.push(this);
}

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

// ************** Helper Functions / Executable Code ***************

// w3resources - Math.floor(Math.random()*items.length)
// thewebdev.info -  if (arr.indexOf(r) === -1) {
//                      arr.push(r);

function renderImages(){
  let possibleIndex = [];
  while(possibleIndex.length < 3){
    let i = Math.floor(Math.random()*allProducts.length);
    if (possibleIndex.indexOf(i) === -1){
      possibleIndex.push(i);
    }
  }
  let productOneIndex = possibleIndex[0];
  let productTwoIndex = possibleIndex[1];
  let productThreeIndex = possibleIndex[2];

  imgOne.src = allProducts[productOneIndex].photo;
  imgOne.alt = allProducts[productOneIndex].name;
  allProducts[productOneIndex].views++;

  imgTwo.src = allProducts[productTwoIndex].photo;
  imgTwo.alt = allProducts[productTwoIndex].name;
  allProducts[productTwoIndex].views++;

  imgThree.src = allProducts[productThreeIndex].photo;
  imgThree.alt = allProducts[productThreeIndex].name;
  allProducts[productThreeIndex].views++;
}

renderImages();

// ************** Event Handlers *****************

function handleClick(event){
  voteCount--;

  let imgClicked = event.target.alt;

  for(let i = 0; i < allProducts.length; i++){
    if(imgClicked === allProducts[i].name){
      allProducts[i].votes++;
    }
  }

  renderImages();

  if(voteCount === 0){
    imgContainer.removeEventListener('click', handleClick);
  }
}

function handleViewResults(){
  if(voteCount === 0){
    for(let i = 0; i <allProducts.length; i++){
      let liElem = document.createElement('li');
      liElem.textContent = `${allProducts[i].name} was shown ${allProducts[i].views} time(s) and voted for ${allProducts[i].votes} time(s).`;
      resultsList.appendChild(liElem);
    }
  }
}

// ************** Event Listeners ****************

imgContainer.addEventListener('click', handleClick);
viewResultsBtn.addEventListener('click', handleViewResults);

console.log(allProducts);
