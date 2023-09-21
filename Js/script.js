const product = document.getElementById('product');
const cartAmount = document.getElementById('cart-amount');
const paymentX = document.getElementById('paymentX');
const cart = document.getElementById('cart');
const overlay = document.querySelector('.cart-overlay');
const cartt = document.querySelector('.cartt');
const cartContent = document.querySelector('.cart-content');
const total = document.querySelector('.total');
const kept = document.querySelector('span.close');
const clear = document.querySelector('.clear');
const shopNow = document.querySelector('.shop-now');
const payment = document.querySelector('.payment');
const paymented = document.querySelector('.paymented');


let items = [
  {
    id: 1,
    title: 'Apple',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    price: 12,
    image: 'Images/apple.jpg',
  },
  {
    id: 2,
    title: 'Banana',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    price: 10,
    image: 'Images/banana.jpg',
  },
  {
    id: 3,
    title: 'WaterMelon',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    price: 9,
    image: 'Images/watermelon.jpg',
  },
  {
    id: 4,
    title: 'Carrot',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    price: 11,
    image: 'Images/carrot.jpg',
  },
  {
    id: 5,
    title: 'Orange',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    price: 12,
    image: 'Images/orange.jpg',
  },
  {
    id: 6,
    title: 'Ginger',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    price: 12,
    image: 'Images/ginger.jpg',
  },
  {
    id: 7,
    title: 'Garlic',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    price: 12,
    image: 'Images/garlic.jpg',
  },
  {
    id: 8,
    title: 'Mango',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    price: 7,
    image: 'Images/mango.jpg',
  },
  {
    id: 9,
    title: 'Guava',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    price: 13,
    image: 'Images/guava.jpg',
  },
  {
    id: 10,
    title: 'Pawpaw',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    price: 19,
    image: 'Images/pawpaw.jpg',
  },
  {
    id: 11,
    title: 'Pears',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    price: 16,
    image: 'Images/pears.jpg',
  },
  {
    id: 12,
    title: 'Tangerine',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    price: 18,
    image: 'Images/tangerine.jpg',
  },

];

let store = JSON.parse(localStorage.getItem('data')) || [];


let displayProduct = () => {
  return (product.innerHTML = items.map((item) => {
    const {id, title, desc, price, image} = item;
    let search = store.find(item => item.id === id) || [];
    return `
    <div id="product-id-${id}" class="product-info">
    <img src=" ${image}" alt="Apple">
    <div class="product-details">
        <h2>${title}</h2>
        <p>${desc}</p>
        <div class="product-price">
            <h3>$ ${price}</h3>
            <div class="plus-minus">
                <i class="fa fa-minus" onclick="decrement(${id})"></i>
                <span id="${id}">
                 ${search.item === undefined ? 0 : search.item}
                </span>
                <i class="fa fa-plus" onclick="increment(${id})"></i>
            </div>
        </div>
    </div>
    </div>
  `
  }).join(''));
};

displayProduct();


//  INCREMENT FUNCTION
let increment = (id) => {
  let selectedProduct = id;
  let enquiry = store.find(item => item.id === selectedProduct);
  if (enquiry === undefined) {
    store.push({
      id: selectedProduct,
      item: 1,
    })
  } else {
    enquiry.item += 1;
  }

  update(id);

  localStorage.setItem('data', JSON.stringify(store));
  displayCart();

}

let decrement = (id) => {
  let selectedProduct = id;
  let enquiry = store.find(item => item.id === selectedProduct);

  if (enquiry === undefined) return;
  else if (enquiry.item === 0) return;
  else {
    enquiry.item -= 1
  }

  update(id);

  store = store.filter(item => item.item !== 0);

  localStorage.setItem('data', JSON.stringify(store));
  displayCart();

}

let update = (id) => {

  let selectedProduct = id;
  let enquiry = store.find(item => item.id === selectedProduct);
  document.getElementById(id).innerText = enquiry.item;
  displayCart();
  calculation();
  totalAmount();
  removeItem();

}

let calculation = () => {
  let output = store.map(item => item.item).reduce((prevValue, currentValue) => {
    return prevValue + currentValue;
  }, 0)
  cartAmount.innerText = output;
}

calculation();




let displayCart = () => {
  if (store.lenght !== 0) {
    return (cartContent.innerHTML = store.map((child) => {
      let {id, item} = child;
      let search = items.find((item) => item.id === id)
      let {image, title, price} = search;
      return `
            <img src="${search.image}" alt="apple" width="100">
             <div class="cart-items">
             <h3>${search.title.toUpperCase()}</h3>
             <h3>$${search.price}</h3>
             <span onclick="removeItem(${id})" class ="fa fa-xmark"></span>
             </div>
             <h3 class="sumUpdate">$${price * item}</h3>
             <div class="cart-update">
            <i class="fa fa-minus" onclick="decrement(${id})"></i>
            <span id= ${id}>${item}</span>
            <i class="fa fa-plus" onclick="increment(${id})"></i>
            </div>     
        `
    }).join(''))

  } else {

  }
}
displayCart();


let removeItem = (id) => {
  let selectedProduct = id;
  store = store.filter(item => item.id !== selectedProduct);
  localStorage.setItem('data', JSON.stringify(store));
  calculation();
  displayCart();
  displayProduct();
  totalAmount()

}
let totalAmount = () => {
  if (store.length !== 0) {
    let amount = store.map((child) => {
      let {id, item} = child;
      let search = items.find((x) => x.id === id) || [];
      let {price} = search;
      return item * price;
    }).reduce((prevValue, currentValue) => prevValue + currentValue, 0)
    total.innerText = `Your Total is : $${amount}`;
  } else {
    localStorage.setItem('data', JSON.stringify(store));
    calculation();
    return total.innerText = `Your Total is $0:00`;
  }
}


totalAmount();


let clearCart = () => {
  store = [];
  displayProduct();
  displayCart();
  totalAmount()
  localStorage.setItem('data', JSON.stringify(store));

}

let showCheckout = () => {
  payment.classList.add('show-payment');
  paymented.classList.add('show-paymented');
  overlay.classList.remove('show')
}
let closeCheckout = () => {
  payment.classList.remove('show-payment');
  paymented.classList.remove('show-paymented');
  overlay.classList.add('show')
}

cart.addEventListener('click', () => {
  overlay.classList.toggle('show');
  cartt.classList.toggle('pop');

});



kept.addEventListener('click', () => {
  //   cartt.style.display = 'none';
  overlay.classList.remove('show');
  cartt.classList.remove('pop');
});


clear.addEventListener('click', clearCart);

shopNow.addEventListener('click', showCheckout);

paymentX.addEventListener('click', closeCheckout);











