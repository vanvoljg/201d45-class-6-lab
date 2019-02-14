'use strict';
console.clear();

// helper functions

var _rand = function (a, b) {
  var min = Math.min(a, b);
  var max = Math.max(a, b);
  return (Math.random() * (max - min) + min);
};

var _randInt = function (a, b) {
  var min = Math.min(a, b);
  var max = Math.max(a, b);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// =====================================

var Fishcookie_store = function (store_location, min_hourly_cust, max_hourly_cust, avg_cookies_per_sale,
  open_at = 6, close_at = 20, list_of_sales = []) {
  this.store_location = store_location;
  this.min_hourly_cust = min_hourly_cust;
  this.max_hourly_cust = max_hourly_cust;
  this.avg_cookies_per_sale = avg_cookies_per_sale;
  this.list_of_sales = list_of_sales;
  this.open_at = open_at;
  this.close_at = close_at;
  list_of_stores.push(this);
};

var list_of_stores = [];

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
  // then pushes the day's total as the final element.
  // Generated from open to close, but one fewer because: we don't sell anything
  // on the hour we close, so omit that from the list.

  this.list_of_sales = [];
  var total = 0;
  var sold = 0;

  for (var ch = this.open_at; ch < this.close_at; ch++) {
    sold = this.calculate_cookies_per_hour();
    total += sold;
    this.list_of_sales.push(sold);
  }

  // Also push the total sales numbers
  this.list_of_sales.push(total);
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

  target.appendChild(tr_el);
};

Fishcookie_store.prototype.render_new_sales = function () {
  this.calculate_cookie_sales();
  this.render_current_sales();
};

var render_table_head = function (open_time, close_time) {
  // render table head by iterating through from open to close, then add a totals
  // column to the end.
  var target = document.getElementById('sales_section');
  var tr_el = document.createElement('tr');
  var td_el = document.createElement('td');

  // append an empty table cell at the beginning
  tr_el.appendChild(td_el);

  for (var ii = open_time; ii < 12; ii++) {
    td_el = document.createElement('td');
    td_el.textContent = `${ii}:00 am`;
    tr_el.appendChild(td_el);
  }
  if (ii === 12) {
    td_el = document.createElement('td');
    td_el.textContent = `${ii}:00 pm`;
    tr_el.appendChild(td_el);
    ii++;
  }
  for (ii; ii < close_time; ii++) {
    td_el = document.createElement('td');
    td_el.textContent = `${ii - 12}:00 pm`;
    tr_el.appendChild(td_el);
  }

  td_el = document.createElement('td');
  td_el.textContent = 'Daily Location Total';
  tr_el.appendChild(td_el);

  target.appendChild(tr_el);
};

var render_table_footer = function (open_time, close_time) {
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

  // Store.list_of_sales.length - 1 corresponds to the last element index in the
  // array
  for (var ii = 0; ii < (close_time - open_time); ii++) {
    // each new time slot needs a new hourly total, start at 0
    hourly_total = 0;

    for (var ij = 0; ij < list_of_stores.length; ij++) {
      hourly_total += list_of_stores[ij].list_of_sales[ii];
    }

    grand_total += hourly_total;

    td_el = document.createElement('td');
    td_el.textContent = hourly_total;
    tr_el.appendChild(td_el);
  }

  td_el = document.createElement('td');
  td_el.textContent = grand_total;
  tr_el.appendChild(td_el);

  target.appendChild(tr_el);
};

new Fishcookie_store('1st and Pike', 23, 65, 6.3);
new Fishcookie_store('SeaTac Airport', 3, 24, 1.2);
new Fishcookie_store('Seattle Center', 11, 38, 3.7);
new Fishcookie_store('Capitol Hill', 20, 38, 2.3);
new Fishcookie_store('Alki', 2, 16, 4.6);

// time in 24-hour format, integers only!
render_table_head(6, 20);

for (var i = 0; i < list_of_stores.length; i++) {
  list_of_stores[i].render_new_sales();
}

render_table_footer(6, 20);
