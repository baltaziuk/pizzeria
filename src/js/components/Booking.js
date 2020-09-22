import { select, templates } from '../settings.js';
// import { utils } from '../utils.js';
// import { app } from '../app.js';


import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';

class Booking {
  constructor(bookingElement) {
    const thisBooking = this;

    thisBooking.render(bookingElement);
    thisBooking.initWidgets();


  }

  render(bookingElement) {
    const thisBooking = this;


    const generatedHTML = templates.bookingWidget();
    //console.log('gen h',generatedHTML);
    thisBooking.dom = {};

    thisBooking.dom.wrapper = bookingElement;
    thisBooking.dom.wrapper.innerHTML = generatedHTML;
    //thisBooking.bookingElement = utils.createDOMFromHTML(generatedHTML);



    //console.log('na dom',thisBooking.bookingElement);
    thisBooking.dom.peopleAmount = document.querySelector(select.booking.peopleAmount);
    thisBooking.dom.hoursAmount = document.querySelector(select.booking.hoursAmount);
    //thisBooking.dom.peopleAmount = thisBooking.bookingElement.querySelector(select.booking.peopleAmount);
    //thisBooking.dom.hoursAmount = thisBooking.bookingElement.querySelector(select.booking.hoursAmount);
    //console.log('dom.people', thisBooking.dom.peopleAmount);

    thisBooking.dom.datePicker = document.querySelector(select.widgets.datePicker.wrapper);
    console.log('dom.dataPicker', thisBooking.dom.datePicker);

  }

  initWidget() {
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);


  }
}

export default Booking;
