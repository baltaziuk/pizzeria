import {select, settings} from '../settings.js';

class AmountWidget {
  constructor(element) {
    const thisWidget = this;
    thisWidget.value = settings.amountWidget.defaultValue;

    thisWidget.getElements(element);

    thisWidget.setValue(thisWidget.input.value);


    thisWidget.initActions();









    //console.log('AmountWidget', thisWidget);
    //console.log('constructor arguments:', element);

  }

  getElements(element) {
    const thisWidget = this;

    thisWidget.element = element;
    thisWidget.input = thisWidget.element.querySelector(select.widgets.amount.input);
    thisWidget.linkDecrease = thisWidget.element.querySelector(select.widgets.amount.linkDecrease);
    thisWidget.linkIncrease = thisWidget.element.querySelector(select.widgets.amount.linkIncrease);
  }


  setValue(value) {
    const thisWidget = this;

    const newValue = parseInt(value);

    /*Add validation */
    if (thisWidget.input.value != newValue && newValue >= settings.amountWidget.defaultMin && newValue <= settings.amountWidget.defaultMax) {
      thisWidget.value = newValue;
      thisWidget.announce();

    }

    thisWidget.input.value = thisWidget.value;


  }

  initActions() {
    const thisWidget = this;
    thisWidget.input.addEventListener('change', function () {
      thisWidget.setValue(thisWidget.input.value);
      //console.log('Widget input', thisWidget.value);
    });

    thisWidget.linkDecrease.addEventListener('click', function () {
      event.preventDefault();
      thisWidget.setValue(thisWidget.value - 1);
      //thisWidget.value = thisWidget.value - 1;
      //thisWidget.input.value = thisWidget.value;
      //console.log('widget -1', thisWidget.value);
    });

    thisWidget.linkIncrease.addEventListener('click', function () {
      event.preventDefault();
      thisWidget.setValue(thisWidget.value + 1);
      // thisWidget.value = eval(thisWidget.value);
      //thisWidget.value += 1; //thisWidget.value + 1;
      //thisWidget.input.value = thisWidget.value;
      //console.log('widget +1', thisWidget.value);
    });



  }

  announce() {
    const thisWidget = this;

    const event = new CustomEvent('updated', {
      bubbles: true
    });
    thisWidget.element.dispatchEvent(event);
  }

}

export default AmountWidget;
