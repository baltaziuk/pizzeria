import {select} from '../settings.js';
import AmountWidget from './AmountWidget.js';

class CartProduct {
  constructor(menuProduct, element) {
    const thisCartProduct = this;

    thisCartProduct.id = menuProduct.id;
    thisCartProduct.name = menuProduct.menu;
    thisCartProduct.price = menuProduct.price;
    thisCartProduct.priceSingle = menuProduct.priceSingle;
    thisCartProduct.amount = menuProduct.amount;
    thisCartProduct.params = JSON.parse(JSON.stringify(menuProduct.params));


    thisCartProduct.getElements(element);


    //console.log('NOWA CartProduct', thisCartProduct);

    thisCartProduct.initAmountWidget();
    thisCartProduct.initActions();

  }

  getElements(element) {
    const thisCartProduct = this;
    thisCartProduct.dom = {};

    thisCartProduct.dom.wrapper = element;

    thisCartProduct.dom.amountWidget = thisCartProduct.dom.wrapper.querySelector(select.cartProduct.amountWidget);
    thisCartProduct.dom.price = thisCartProduct.dom.wrapper.querySelector(select.cartProduct.price);
    thisCartProduct.dom.edit = thisCartProduct.dom.wrapper.querySelector(select.cartProduct.edit);
    thisCartProduct.dom.remove = thisCartProduct.dom.wrapper.querySelector(select.cartProduct.remove);

  }

  initAmountWidget() {
    const thisCartProduct = this;

    thisCartProduct.amountWidget = new AmountWidget(thisCartProduct.dom.amountWidget);

    thisCartProduct.dom.amountWidget.addEventListener('updated', function () {


      thisCartProduct.amount = thisCartProduct.amountWidget.value;
      //console.log('ilosc z formularza' , thisCartProduct.amount);

      thisCartProduct.price = thisCartProduct.priceSingle * thisCartProduct.amount;
      //console.log('wynik mnożenia', thisCartProduct.price);

      thisCartProduct.dom.price.innerHTML = thisCartProduct.price;


    });

  }

  remove() {
    const thisCartProduct = this;

    const event = new CustomEvent('remove', {
      bubbles: true,
      detail: {
        cartProduct: thisCartProduct,

      },
    });

    thisCartProduct.dom.wrapper.dispatchEvent(event);

  }

  initActions() {
    const thisCartProduct = this;
    thisCartProduct.dom.edit.addEventListener('click', function () {
      event.preventDefault();

    });

    thisCartProduct.dom.remove.addEventListener('click', function () {
      event.preventDefault();
      thisCartProduct.remove();
      // console.log('guzik usuwanie', thisCartProduct.remove);
    });


  }

  getData(){
    const thisCartProduct = this;
    const orderedProductData = {
      id: thisCartProduct.id,
      amount: thisCartProduct.amount,
      price: thisCartProduct.price,
      priceSingle: thisCartProduct.price,
      params: thisCartProduct.params,
    };
    return orderedProductData;

  }


}

export default CartProduct;
