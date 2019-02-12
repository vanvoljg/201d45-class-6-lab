'use strict';
console.clear();

/*
Store location object
  min customers per hour
  max customers per hour
  average cookies per customer
  .render_sales_numbers() random number of customers per hour, integers
*/

// The following randInt function is pulled from MDN:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values_inclusive
// And modified to take number in any order, because you never know
function randInt(a, b) {
  var min = Math.ceil(Math.min(a, b));
  var max = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

var first_and_pike = {
  location : '1st and Pike',
  min_hourly_cust : 23,
  max_hourly_cust : 65,
  avg_cookies_per_sale: 6.3,
  sales_list : [],
  close_at : 20,
  open_at : 6
};

// defining methods for objects
var number_of_customers = function() {
  // returns a random 
  return randInt(this.min_hourly_cust, this.max_hourly_cust);
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
  var sold = Math.floor(this.number_of_customers() * this.avg_cookies_per_sale / 2);
  var total = sold;
  var current_hour = this.open_at;
  this.sales_list.push(`${current_hour}am: ${sold} cookies`);

  // Loop from hour +1 to 11, because noon is a special case
  for (current_hour++; current_hour < 12 ; current_hour++) {
    sold = Math.floor(this.number_of_customers() * this.avg_cookies_per_sale);
    total += sold;
    this.sales_list.push(`${current_hour}am: ${sold} cookies`);
  }
  
  // Noon is a special case all to itself
  sold = Math.floor(this.number_of_customers() * this.avg_cookies_per_sale);
  total += sold;
  this.sales_list.push(`${current_hour}pm: ${sold} cookies`);

  // Finish the rest of the time the store is open
  for (current_hour = 1; current_hour < (this.close_at - 12); current_hour++) {
    sold = Math.floor(this.number_of_customers() * this.avg_cookies_per_sale);
    total += sold;
    this.sales_list.push(`${current_hour}pm: ${sold} cookies`);
  }

  // At close-time, only report a half-hour duration of sales
  sold = Math.floor(this.number_of_customers() * this.avg_cookies_per_sale / 2);
  total += sold;
  this.sales_list.push(`${current_hour}pm: ${sold} cookies`);

  // Also push the total sales numbers
  this.sales_list.push(`Total: ${total}`);
};

var render_sales_list = function() {
  console.log('Render sales list for ' + this.location);
  console.log(this.sales_list);

  // create inner list first, store it as a fragment element, append to the
  // outer ul object... TODO MORE STUFF

  // get the ul element with id 'sales_projections'
  var sales_section = document.getElementById('sales_projections');
  var ul_el = document.createElement('ul');
  var li_el = document.createElement('li');
  var article_el = document.createElement('article');
  var h4_el = document.createElement('h4');
  var append_el;

  // // create li, appendchild to compleVte_el
  // append_el = document.cloneNode(li_el);
  // sales_section.appendChild(append_el);
  
  // // create article, append to complete_el
  // append_el = document.cloneNode(article_el);
  // sales_section.appendChild(append_el);

  // // create h4, set textContent to be this.location, append to complete_el
  // append_el = document.cloneNode(h4_el);
  // append_el.textContent = this.location;
  // sales_section.appendChild(append_el);

  // // create ul
  // append_el = document.cloneNode(ul_el);
  // sales_section.appendChild(append_el);

  // // loop through this.sales_list array. for each element in the array,
  // // create li, set textContent = this.sales_list[ii]
  // // append the in-process li to sales_section
  // for (var ii = 0; ii < this.sales_list.length; ii++) {
  //   console.log(this.sales_list[ii]);
  // }
  /*
<ul>
      <li>
        <article>
          <h4>1st and Pike</h4>
          <ul>
            <li>6am: 16 cookies</li>
            <li>7am: 20 cookies</li>
            <li>...</li>
            <li>7pm: 57 cookies</li>
            <li>8pm: 29 cookies</li>
            <li>Total: 657 cookies</li>
          </ul>
        </article>
      </li>
    </ul>
  */
};

// adding mthods to location objects

first_and_pike.number_of_customers = number_of_customers;
first_and_pike.calculate_cookie_sales = calculate_cookie_sales;
first_and_pike.render_sales_list = render_sales_list;
