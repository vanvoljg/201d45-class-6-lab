'use strict';
console.clear();

// helper functions

// The following _randInt function is pulled from MDN:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values_inclusive
// And modified to take number in any order, because you never know
function _randInt(a, b) {
  var min = Math.ceil(Math.min(a, b));
  var max = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

// =====================================

var First_and_pike = {
  location : '1st and Pike',
  min_hourly_cust : 23,
  max_hourly_cust : 65,
  avg_cookies_per_sale: 6.3,
  sales_list : [],
  close_at : 20,
  open_at : 6
};

var Seatac_airport = {
  location : 'SeaTac Airport',
  min_hourly_cust : 3,
  max_hourly_cust : 24,
  avg_cookies_per_sale: 1.2,
  sales_list : [],
  close_at : 20,
  open_at : 6
};

var Seattle_center = {
  location : 'Seattle Center',
  min_hourly_cust : 11,
  max_hourly_cust : 38,
  avg_cookies_per_sale: 3.7,
  sales_list : [],
  close_at : 20,
  open_at : 6
};

var Capitol_hill = {
  location : 'Capitol Hill',
  min_hourly_cust : 20,
  max_hourly_cust : 38,
  avg_cookies_per_sale: 2.3,
  sales_list : [],
  close_at : 20,
  open_at : 6
};

var Alki = {
  location : 'Alki',
  min_hourly_cust : 2,
  max_hourly_cust : 16,
  avg_cookies_per_sale: 4.6,
  sales_list : [],
  close_at : 20,
  open_at : 6
};

// defining methods for objects

var number_of_customers = function() {
  // returns a random number of customers in a given range.
  return _randInt(this.min_hourly_cust, this.max_hourly_cust);
};

// calculates cookies per hour
// Returns a number of cookies in an hourly period
// Takes no input, returns an integer
var calculate_cookies_per_hour = function() {
  return Math.floor(this.number_of_customers() * this.avg_cookies_per_sale);
};

var calculate_cookie_sales = function() {
  // pushes array elements to the sales_list array of the format
  // #[am/pm]: #sold cookies
  // Then a final element of
  // Total: total cookies

  // note that open and close numbers will have to be half-hour durations
  // because the 6am slot reports 6-6:30 and the 8pm slot reports 7:30-8pm
  // So at open time, only report a half-hour duration of sales
  this.sales_list = [];
  var total = 0, sold = 0;
  var current_hour = this.open_at;

  // Open time is half an hour
  sold = Math.floor(this.calculate_cookies_per_hour() / 2);
  total =+ sold;
  this.sales_list.push(`${current_hour}am: ${sold} cookies`);

  // Loop from hour +1 to 11, because noon is a special case
  for (current_hour++; current_hour < 12 ; current_hour++) {
    sold = this.calculate_cookies_per_hour();
    total += sold;
    this.sales_list.push(`${current_hour}am: ${sold} cookies`);
  }

  // Noon is a special case all to itself
  sold = this.calculate_cookies_per_hour();
  total += sold;
  this.sales_list.push(`${current_hour}pm: ${sold} cookies`);

  // Finish the rest of the time the store is open
  for (current_hour = 1; current_hour < (this.close_at - 12); current_hour++) {
    sold = this.calculate_cookies_per_hour();
    total += sold;
    this.sales_list.push(`${current_hour}pm: ${sold} cookies`);
  }

  // At close-time, only report a half-hour duration of sales
  sold = Math.floor(this.calculate_cookies_per_hour() / 2);
  total += sold;
  this.sales_list.push(`${current_hour}pm: ${sold} cookies`);

  // Also push the total sales numbers
  this.sales_list.push(`Total: ${total} cookies`);
};

//
var render_sales_list = function() {
  console.log('Render sales list for ' + this.location);
  console.log(this.sales_list);

  // li > h4, ul -> li (6am: 16 cookies)

  // get the ul element with id 'sales_projections'
  var target = document.getElementById('sales_projections');
  var ul_el = document.createElement('ul');
  var li_el = document.createElement('li');
  var h4_el = document.createElement('h4');
  var hour_li_el;

  h4_el.textContent = this.location;
  li_el.appendChild(h4_el);

  // build ul, append each sales_list item to the list
  for (var ii = 0; ii < this.sales_list.length; ii++) {
    hour_li_el = document.createElement('li');
    hour_li_el.textContent = this.sales_list[ii];
    ul_el.appendChild(hour_li_el);
  }

  li_el.appendChild(ul_el);
  target.appendChild(li_el);
};

// adding mthods to location objects

First_and_pike.number_of_customers = number_of_customers;
First_and_pike.calculate_cookies_per_hour = calculate_cookies_per_hour;
First_and_pike.calculate_cookie_sales = calculate_cookie_sales;
First_and_pike.render_sales_list = render_sales_list;

Seatac_airport.number_of_customers = number_of_customers;
Seatac_airport.calculate_cookies_per_hour = calculate_cookies_per_hour;
Seatac_airport.calculate_cookie_sales = calculate_cookie_sales;
Seatac_airport.render_sales_list = render_sales_list;

Seattle_center.number_of_customers = number_of_customers;
Seattle_center.calculate_cookie_sales = calculate_cookie_sales;
Seattle_center.calculate_cookies_per_hour = calculate_cookies_per_hour;
Seattle_center.render_sales_list = render_sales_list;

Capitol_hill.number_of_customers = number_of_customers;
Capitol_hill.calculate_cookie_sales = calculate_cookie_sales;
Capitol_hill.calculate_cookies_per_hour = calculate_cookies_per_hour;
Capitol_hill.render_sales_list = render_sales_list;

Alki.number_of_customers = number_of_customers;
Alki.calculate_cookie_sales = calculate_cookie_sales;
Alki.calculate_cookies_per_hour = calculate_cookies_per_hour;
Alki.render_sales_list = render_sales_list;

First_and_pike.calculate_cookie_sales();
First_and_pike.render_sales_list();

Seatac_airport.calculate_cookie_sales();
Seatac_airport.render_sales_list();

Seattle_center.calculate_cookie_sales();
Seattle_center.render_sales_list();

Capitol_hill.calculate_cookie_sales();
Capitol_hill.render_sales_list();
