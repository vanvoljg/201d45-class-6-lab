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

var First_and_pike = {
  location : '1st and Pike',
  min_hourly_cust : 23,
  max_hourly_cust : 65,
  avg_cookies_per_sale: 6.3,
  list_of_sales : [],
  close_at : 20,
  open_at : 6
};

var Seatac_airport = {
  location : 'SeaTac Airport',
  min_hourly_cust : 3,
  max_hourly_cust : 24,
  avg_cookies_per_sale: 1.2,
  list_of_sales : [],
  close_at : 20,
  open_at : 6
};

var Seattle_center = {
  location : 'Seattle Center',
  min_hourly_cust : 11,
  max_hourly_cust : 38,
  avg_cookies_per_sale: 3.7,
  list_of_sales : [],
  close_at : 20,
  open_at : 6
};

var Capitol_hill = {
  location : 'Capitol Hill',
  min_hourly_cust : 20,
  max_hourly_cust : 38,
  avg_cookies_per_sale: 2.3,
  list_of_sales : [],
  close_at : 20,
  open_at : 6
};

var Alki = {
  location : 'Alki',
  min_hourly_cust : 2,
  max_hourly_cust : 16,
  avg_cookies_per_sale: 4.6,
  list_of_sales : [],
  close_at : 20,
  open_at : 6
};

// defining methods for objects

var number_of_customers = function() {
  // returns a random number of customers in a given range.
  return _rand(this.min_hourly_cust, this.max_hourly_cust);
};

// calculates cookies per hour
// Returns a number of cookies in an hourly period
// Takes no input, returns an integer
var calculate_cookies_per_hour = function() {
  return Math.floor(this.number_of_customers() * this.avg_cookies_per_sale);
};

var calculate_cookie_sales = function() {
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
    if (ch < 12) {
      this.list_of_sales.push(`${ch}am: ${sold} cookies`);
      continue;
    } else if (ch === 12) {
      this.list_of_sales.push(`${ch}pm: ${sold} cookies`);
      continue;
    }
    this.list_of_sales.push(`${ch - 12}pm: ${sold} cookies`);
  }

  // Also push the total sales numbers
  this.list_of_sales.push(`Total: ${total} cookies`);
};

//
var render_list_of_sales = function() {
  console.log('Render sales list for ' + this.location);
  console.log(this.list_of_sales);

  // li > h4, ul -> li (6am: 16 cookies)

  // get the ul element with id 'sales_section'
  var target = document.getElementById('sales_section');
  var ul_el = document.createElement('ul');
  var li_el = document.createElement('li');
  var h4_el = document.createElement('h4');
  var hour_li_el;

  h4_el.textContent = this.location;
  li_el.appendChild(h4_el);

  // build ul, append each list_of_sales item to the list
  for (var ii = 0; ii < this.list_of_sales.length; ii++) {
    hour_li_el = document.createElement('li');
    hour_li_el.textContent = this.list_of_sales[ii];
    ul_el.appendChild(hour_li_el);
  }

  li_el.appendChild(ul_el);
  target.appendChild(li_el);
};

// adding mthods to location objects

First_and_pike.number_of_customers = number_of_customers;
First_and_pike.calculate_cookies_per_hour = calculate_cookies_per_hour;
First_and_pike.calculate_cookie_sales = calculate_cookie_sales;
First_and_pike.render_list_of_sales = render_list_of_sales;

Seatac_airport.number_of_customers = number_of_customers;
Seatac_airport.calculate_cookies_per_hour = calculate_cookies_per_hour;
Seatac_airport.calculate_cookie_sales = calculate_cookie_sales;
Seatac_airport.render_list_of_sales = render_list_of_sales;

Seattle_center.number_of_customers = number_of_customers;
Seattle_center.calculate_cookie_sales = calculate_cookie_sales;
Seattle_center.calculate_cookies_per_hour = calculate_cookies_per_hour;
Seattle_center.render_list_of_sales = render_list_of_sales;

Capitol_hill.number_of_customers = number_of_customers;
Capitol_hill.calculate_cookie_sales = calculate_cookie_sales;
Capitol_hill.calculate_cookies_per_hour = calculate_cookies_per_hour;
Capitol_hill.render_list_of_sales = render_list_of_sales;

Alki.number_of_customers = number_of_customers;
Alki.calculate_cookie_sales = calculate_cookie_sales;
Alki.calculate_cookies_per_hour = calculate_cookies_per_hour;
Alki.render_list_of_sales = render_list_of_sales;

First_and_pike.calculate_cookie_sales();
First_and_pike.render_list_of_sales();

Seatac_airport.calculate_cookie_sales();
Seatac_airport.render_list_of_sales();

Seattle_center.calculate_cookie_sales();
Seattle_center.render_list_of_sales();

Capitol_hill.calculate_cookie_sales();
Capitol_hill.render_list_of_sales();
