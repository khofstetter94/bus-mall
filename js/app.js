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

// ************** Canvas Reference ***************

let ctx = document.getElementById('my-chart').getContext('2d');

// ************** Constructor ********************

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.views = 0;
  this.votes = 0;
  this.photo = `img/${name}.${fileExtension}`;

  allProducts.push(this);
}

// ************** Local Storage 2 ***************

let retrievedProducts = localStorage.getItem('products');

let parsedProducts = JSON.parse(retrievedProducts);

if(retrievedProducts){
  allProducts = parsedProducts;
} else{
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
}

// ************** Helper Functions / Executable Code ***************

// w3resources - Math.floor(Math.random()*items.length)
// thewebdev.info -  if (arr.indexOf(r) === -1) {
//                      arr.push(r);

let possibleIndex = [];
function renderImages() {
  while (possibleIndex.length < 6) {
    let i = Math.floor(Math.random() * allProducts.length);
    if (possibleIndex.indexOf(i) === -1) {
      possibleIndex.splice(0, 0, i);
    }
  }
  let productOneIndex = possibleIndex.pop();
  let productTwoIndex = possibleIndex.pop();
  let productThreeIndex = possibleIndex.pop();

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

// ************** Function Render Chart **********

function renderChart() {
  let products = [];
  let votes = [];
  let views = [];
  for(let i = 0; i < allProducts.length; i++){
    products.push(allProducts[i].name);
    votes.push(allProducts[i].votes);
    views.push(allProducts[i].views);
  }

  let myChartObject = {
    type: 'bar',
    data: {
      labels: products,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: views,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  new Chart(ctx, myChartObject);
}

// ************** Event Handlers *****************

function handleClick(event) {
  voteCount--;

  let imgClicked = event.target.alt;

  for (let i = 0; i < allProducts.length; i++) {
    if (imgClicked === allProducts[i].name) {
      allProducts[i].votes++;
    }
  }

  renderImages();

  if (voteCount === 0) {
    imgContainer.removeEventListener('click', handleClick);

    // ************* Local Storage Begins ************

    let stringifiedProducts = JSON.stringify(allProducts);

    localStorage.setItem('products', stringifiedProducts);
  }
}

function handleViewResults() {
  if (voteCount === 0) {
    renderChart();
    viewResultsBtn.removeEventListener('click', handleViewResults);
  }
}

// ************** Event Listeners ****************

imgContainer.addEventListener('click', handleClick);
viewResultsBtn.addEventListener('click', handleViewResults);

console.log(allProducts);
