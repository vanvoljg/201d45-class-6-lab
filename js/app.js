'use strict';
console.clear();

// helper functions

var _rand = function (a, b) {
  // takes in any two numbers in any order, returns a random float between them
  var min = Math.min(a, b);
  var max = Math.max(a, b);
  return (Math.random() * (max - min) + min);
};

var _12hr_list = function (a = 1, b = 24) {
  // takes two optional arguments, numbers between 1 and 24, or defaults to 1-24
  // returns an object with keys of the range of hours given, and corresponding
  // values in a string format '##:00 am/pm'
  // { 5 : '5:00 am', 16 : '4:00 pm' }, etc.
  var min = Math.floor( Math.min(a, b) );
  var max = Math.floor( Math.max(a, b) );
  var rtn = {};
  for (var i = min; i < max + 1; i++) { // up to max+1 for inclusive array
    if (i < 1) i = 1; // if started earlier than 1am, set to 1am;
    if (i < 12) {
      rtn[i] = `${i}:00 am`;
      continue;
    } else if (i === 12) {
      rtn[12] = '12:00 pm';
      continue;
    } else if (i < 24) {
      rtn[i] = `${i - 12}:00 pm`;
      continue;
    } else {
      rtn[24] = '12:00 am';
      break; // Do not continue past 24 for any reason
    }
  }
  return rtn;
};

// =====================================

var list_of_stores = [];

var Fishcookie_store = function (store_location, min_hourly_cust, max_hourly_cust,
  avg_cookies_per_sale, open_at = 6, close_at = 20, list_of_sales = []) {
  this.store_location = store_location;
  this.min_hourly_cust = min_hourly_cust;
  this.max_hourly_cust = max_hourly_cust;
  this.avg_cookies_per_sale = avg_cookies_per_sale;
  this.list_of_sales = list_of_sales || [];
  this.open_at = open_at || 6;
  this.close_at = close_at || 20;
  this.daily_total = 0;
  list_of_stores.push(this);
  // as part of instantiation, calculate new sales to prevent having to do it later
  this.calculate_cookie_sales();
};

// defining methods for objects

Fishcookie_store.prototype.number_of_customers = function () {
  // returns a random number of customers in a given range.
  return _rand(this.min_hourly_cust, this.max_hourly_cust);
};

Fishcookie_store.prototype.calculate_cookies_per_hour = function () {
  // calculates cookies per hour
  // Returns a number of cookies in an hourly period
  // Takes no input, returns an integer
  return Math.floor(this.number_of_customers() * this.avg_cookies_per_sale);
};

Fishcookie_store.prototype.calculate_cookie_sales = function () {
  // pushes an hour's worth of cookie sales onto the this.list_of_sales array
  // and increments this.total.
  // Generated from open to close, but one fewer because: we don't sell anything
  // on the hour we close, so omit that from the list.

  this.list_of_sales = [];
  this.daily_total = 0;
  var sold = 0;

  for (var ch = this.open_at; ch < this.close_at; ch++) {
    sold = this.calculate_cookies_per_hour();
    this.daily_total += sold;
    this.list_of_sales.push(sold);
  }
};

Fishcookie_store.prototype.render_current_sales = function () {
  // render function, produces a table row and appends it to the data table
  var target = document.getElementById('sales_section');
  var tr_el = document.createElement('tr');
  var td_el = document.createElement('td');

  td_el.textContent = this.store_location;
  tr_el.appendChild(td_el);

  for (var ii = 0; ii < this.list_of_sales.length; ii++) {
    td_el = document.createElement('td');
    td_el.textContent = this.list_of_sales[ii];
    tr_el.appendChild(td_el);
  }

  td_el = document.createElement('td');
  td_el.textContent = this.daily_total;
  tr_el.appendChild(td_el);

  target.appendChild(tr_el);
};

var render_table_head = function (open_time = 6, close_time = 20) {
  // render table head by iterating through from open to close, then add a totals
  // column to the end.
  var target = document.getElementById('sales_section');
  target.innerHTML = '';
  var tr_el = document.createElement('tr');
  var td_el = document.createElement('td');

  // append an empty table cell at the beginning
  tr_el.appendChild(td_el);

  var hourlist = _12hr_list(open_time, close_time);

  for (var ii = open_time; ii < close_time; ii ++) {
    td_el = document.createElement('td');
    td_el.textContent = hourlist[ii];
    tr_el.appendChild(td_el);
  }

  td_el = document.createElement('td');
  td_el.textContent = 'Daily Location Total';
  tr_el.appendChild(td_el);

  target.appendChild(tr_el);
};

var render_table_footer = function (open_time = 6, close_time = 20) {
  // render table footer by using the list of objects, for each index of
  // list_of_sales, add them together to a column total, but also have a running
  // grand total to print at the end of the row
  var target = document.getElementById('sales_section');
  var tr_el = document.createElement('tr');
  var td_el = document.createElement('td');
  var grand_total = 0;
  var hourly_total = 0;

  td_el.textContent = 'Totals';
  tr_el.appendChild(td_el);

  for (var ii = 0; ii < (close_time - open_time); ii++) {
    // each new time slot needs a new hourly total, start at 0
    hourly_total = 0;

    for (var ij = 0; ij < list_of_stores.length; ij++) {
      // hourly total adds the current hour (ii) from list_of sales belonging to the
      // current item (ij) of displayed stores array
      hourly_total += list_of_stores[ij].list_of_sales[ii];
    }

    // then appends the hourly total to the table as a td
    td_el = document.createElement('td');
    td_el.textContent = hourly_total;
    tr_el.appendChild(td_el);
  }

  // the last table cell needs to be the grand total, a sum of the daily totals
  // for each displayed store
  for (var jj = 0; jj < list_of_stores.length; jj++) {
    grand_total += list_of_stores[jj].daily_total;
  }

  // and append that total to the end...
  td_el = document.createElement('td');
  td_el.textContent = grand_total;
  tr_el.appendChild(td_el);

  target.appendChild(tr_el);
};

var render_stores_table = function () {
  render_table_head();

  for (var i = 0; i < list_of_stores.length; i++) {
    list_of_stores[i].render_current_sales();
  }

  render_table_footer();
};

var add_store_handler = function(event) {
  // this function handles click events inside the add_store_form element
  // if clicks do not happen on the add_store_submit button, exit the callback
  if (event.target.id !== 'add_store_submit') return;

  // prevent default submit behavior -- don't refresh the page!
  event.preventDefault();

  // event.currentTarget is the DOM object node of the element that has the
  // currently-fired event handler attached to it.
  // If the form is not valid, checking will make the browser do an HTML5 validation
  // and will exit the callback
  var form = event.currentTarget;
  if (!form.reportValidity()) return;

  // form data is validated at this point, so turn numbers into numbers.
  var loc = form.store_location.value;
  var min = parseInt(form.min_hourly_cust.value);
  var max = parseInt(form.max_hourly_cust.value);
  var rate = parseFloat(form.avg_cookies_per_sale.value);

  // if min is greater than max, switch them
  // the way this works: min is set to the first index of an array, which is 
  // created before min gets assigned a new value.
  // the array is the value of max, which is actually the min, and so the array
  // becomes [min, true], and as part of creating the array, max is assigned
  // the value of min, which is actually the max when the array is created.
  // goes like this: min = 6, max = 2 --> min = [2, (max=6)][0] = 2, and as part
  // of creating that array, max now === 6.
  if (min > max) {
    min = [max, max = min][0];
  }

  // check if the location already exists. if it does, update the values and
  // print an alert saying things got changed. then leave the function
  for (var i = 0; i < list_of_stores.length; i++) {
    if (loc.toLowerCase() === list_of_stores[i].store_location.toLowerCase()) {
      list_of_stores[i].min_hourly_cust = min;
      list_of_stores[i].max_hourly_cust = max;
      list_of_stores[i].avg_cookies_per_sale = rate;
      alert(`Location "${list_of_stores[i].store_location}" updated with new values:
Minimum customers/hour: ${min}
Maximum customers/hour: ${max}
Average cookies per sale: ${rate}`);

      list_of_stores[i].calculate_cookie_sales();
      render_stores_table();
      form.reset();
      return;
    }
  }

  // all input data is validated. make a new store
  new Fishcookie_store(loc, min, max, rate);

  // repopulate the display lists with new list of stores
  // populate_display_lists();
  render_stores_table();

  // reset the entry form
  form.reset();
};

var display_form_handler = function(event) {
  if (event.target.id !== 'recalculate_all') return;

  event.preventDefault();

  for (var l = 0; l < list_of_stores.length; l++) {
    list_of_stores[l].calculate_cookie_sales();
  }

  render_stores_table();
};

// init function

var init = function() {
  new Fishcookie_store('1st and Pike', 23, 65, 6.3);
  new Fishcookie_store('SeaTac Airport', 3, 24, 1.2);
  new Fishcookie_store('Seattle Center', 11, 38, 3.7);
  new Fishcookie_store('Capitol Hill', 20, 38, 2.3);
  new Fishcookie_store('Alki', 2, 16, 4.6);

  render_stores_table();

  var add_store_form = document.getElementById('add_store_form');
  add_store_form.addEventListener('click', add_store_handler);

  var display_form_click = document.getElementById('display_form');
  display_form_click.addEventListener('click', display_form_handler);
};

// run the app

init();
