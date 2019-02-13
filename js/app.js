'use strict';
console.clear();

// helper functions

var _rand = function(a, b) {
  var min = Math.min(a, b);
  var max = Math.max(a, b);
  return (Math.random() * (max - min) + min);
};

var _randInt = function(a, b) {
  var min = Math.min(a, b);
  var max = Math.max(a, b);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// =====================================

var Fishcookie_store = function(location, min_hourly_cust, max_hourly_cust, avg_cookies_per_sale,
  open_at, close_at, list_of_sales = []) {
  this.location = location;
  this.min_hourly_cust = min_hourly_cust;
  this.max_hourly_cust = max_hourly_cust;
  this.avg_cookies_per_sale = avg_cookies_per_sale;
  this.list_of_sales = list_of_sales;
  this.open_at = open_at;
  this.close_at = close_at;
};

var First_and_pike = new Fishcookie_store('1st and Pike', 23, 65, 6.3, 6, 20);
var Seatac_airport = new Fishcookie_store('SeaTac Airport', 3, 24, 1.2, 6, 20);
var Seattle_center = new Fishcookie_store('Seattle Center', 11, 38, 3.7, 6, 20);
var Capitol_hill = new Fishcookie_store('Capitol Hill', 20, 38, 2.3, 6, 20);
var Alki = new Fishcookie_store('Alki', 2, 16, 4.6, 6, 20);

// defining methods for objects

Fishcookie_store.prototype.number_of_customers = function() {
  // returns a random number of customers in a given range.
  return _rand(this.min_hourly_cust, this.max_hourly_cust);
};

// calculates cookies per hour
// Returns a number of cookies in an hourly period
// Takes no input, returns an integer
Fishcookie_store.prototype.calculate_cookies_per_hour = function() {
  return Math.floor(this.number_of_customers() * this.avg_cookies_per_sale);
};

Fishcookie_store.prototype.calculate_cookie_sales = function() {
  // pushes array elements to the list_of_sales array of the format
  // #[am/pm]: #sold cookies
  // Then a final element of
  // Total: total cookies
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

// render function, produces a table row and appends it to the data table
Fishcookie_store.prototype.render = function() {
  console.log('Render sales list for ' + this.location);
  console.log(this.list_of_sales);

  var target = document.getElementById('sales_section');
  var tr_el = document.createElement('tr');
  var td_el;

  for (var ii = 0; ii < this.list_of_sales.length; ii++) {
    td_el = document.createElement('td');
    td_el.textContent = this.list_of_sales[ii];
    tr_el.appendChild(td_el);
  }

  target.appendChild(tr_el);
};

// render table head by iterating through the array of objects used

// adding mthods to location objects

First_and_pike.calculate_cookie_sales();
First_and_pike.render();

Seatac_airport.calculate_cookie_sales();
Seatac_airport.render();

Seattle_center.calculate_cookie_sales();
Seattle_center.render();

Capitol_hill.calculate_cookie_sales();
Capitol_hill.render();
