import {settings, select, templates, classNames} from '../settings.js';
import {utils} from '../utils.js';
import CartProduct from './CartProduct.js';

class Cart {
  constructor(element) {
    const thisCart = this;




    thisCart.products = [];
    thisCart.deliveryFee = settings.cart.defaultDeliveryFee;



    thisCart.getElements(element);
    thisCart.initActions();



    //console.log('new Cart', thisCart);
  }

  getElements(element) {
    const thisCart = this;

    thisCart.dom = {};
    //console.log('obiekty',thisCart);

    thisCart.dom.wrapper = element;

    thisCart.dom.form = thisCart.dom.wrapper.querySelector(select.cart.form);
    // console.log('form', thisCart.dom.form);
    thisCart.dom.formInputAddress = thisCart.dom.wrapper.querySelector(select.cart.address);
    console.log('inputy', thisCart.dom.formInputAddress);

    thisCart.dom.formInputPhone = thisCart.dom.wrapper.querySelector(select.cart.phone);
    console.log('inputy', thisCart.dom.formInputPhone);

    thisCart.dom.toggleTrigger = thisCart.dom.wrapper.querySelector(select.cart.toggleTrigger);
    thisCart.dom.productList = thisCart.dom.wrapper.querySelector(select.cart.productList);
    //console.log('thisCart.dom.productlist', thisCart.dom.productList);

    thisCart.renderTotalsKeys = ['totalNumber', 'totalPrice', 'subtotalPrice', 'deliveryFee'];

    for (let key of thisCart.renderTotalsKeys) {
      thisCart.dom[key] = thisCart.dom.wrapper.querySelectorAll(select.cart[key]);
    }
  }

  initActions() {
    const thisCart = this;
    thisCart.dom.toggleTrigger.addEventListener('click', function () {
      //event.preventDefault();
      thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
    });

    thisCart.dom.productList.addEventListener('updated', function () {
      thisCart.update();
    });

    thisCart.dom.productList.addEventListener('remove', function () {
      thisCart.remove(event.detail.cartProduct);
    });

    thisCart.dom.form.addEventListener('submit', function () {
      event.preventDefault();
      thisCart.sendOrder();
    });
  }

  sendOrder() {

    const thisCart = this;

    const url = settings.db.url + '/' + settings.db.order;

    const payload = {
      address: thisCart.dom.formInputAddress.value,
      phone: thisCart.dom.formInputPhone.value,
      totalNumber: thisCart.totalNumber,
      subtotalPrice: thisCart.subtotalPrice,
      totalPrice: thisCart.totalPrice,
      deliveryFee: thisCart.deliveryFee,
      products: [],

    };



    for (const orderedProduct of thisCart.products){
      orderedProduct.getData();
      payload.products.push(orderedProduct.getData());

    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),

    };

    fetch(url, options)
      .then(function (response) {
        return response.json();
      }).then(function (parsedResponse) {
        console.log('parseResponse', parsedResponse);
      });

  }

  add(menuProduct) {
    const thisCart = this;

    const generatedHTML = templates.cartProduct(menuProduct);
    // console.log('generowany HTML', generatedHTML);

    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    thisCart.dom.productList.appendChild(generatedDOM);


    //console.log('adding producr', menuProduct);

    thisCart.products.push(new CartProduct(menuProduct, generatedDOM));
    //console.log('thisCart.product', thisCart.products);

    thisCart.update();


  }

  update() {
    const thisCart = this;
    thisCart.totalNumber = 0;
    thisCart.subtotalPrice = 0;

    for (let product of thisCart.products) {
      thisCart.subtotalPrice += product.price;
      thisCart.totalNumber += product.amount;
    }
    thisCart.totalPrice = thisCart.subtotalPrice + thisCart.deliveryFee;

    console.log('Total number', thisCart.totalNumber);
    console.log('Subtotal', thisCart.subtotalPrice);
    console.log('total price', thisCart.totalPrice);

    for (let key of thisCart.renderTotalsKeys) {
      for (let elem of thisCart.dom[key]) {
        elem.innerHTML = thisCart[key];
      }
    }
  }

  remove(cartProduct) {
    const thisCart = this;
    //console.log('tablica', thisCart.products);
    const index = thisCart.products.indexOf(cartProduct);
    //console.log('index', index);
    thisCart.products.splice(index, 1);
    cartProduct.dom.wrapper.remove();


    thisCart.update();

  }

}

export default Cart;
