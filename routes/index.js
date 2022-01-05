var express = require('express');
var router = express.Router();
const abbr = require("../data/countries/src/country-by-abbreviation.json")
const calling = require("../data/countries/src/country-by-calling-code.json")
const capital = require("../data/countries/src/country-by-capital-city.json")
const currencyName = require("../data/countries/src/country-by-currency-name.json")
const currencyCode = require("../data/countries/src/country-by-currency-code.json")
const freedom = require("../data/countries/src/country-by-independence-date.json")


const countries = []
const countryMapping = {}




abbr.forEach(function (item) {
  const country = {
    
    country_code: item.abbreviation,
    country_name: item.country
  };
  calling.forEach(function (cc) {
    if (cc.country === item.country) {
      country.calling_code = cc.calling_code
    }b
  });
  capital.forEach(function (cc) {
    if (cc.country === item.country) {
      country.city = cc.city
    }
  });
  currencyName.forEach(function (cc) {
    if (cc.country === item.country) {
      country.currency_name = cc.currency_name
    }
  });
  currencyCode.forEach(function (cc) {
    if (cc.country === item.country) {
      country.currency_code = cc.currency_code
    }
  });
  freedom.forEach(function (cc) {
    if (cc.country === item.country) {
      country.independence = cc.independence
    }
  });
  countries.push(country)
  // console.log("49", country)
  countryMapping[country.country_code] = country;


  if (country.calling_code) {
    if (!countryMapping[country.calling_code]) {
      countryMapping[country.calling_code] = [country];
    } else {
      countryMapping[country.calling_code].push(country);
    }
  }
  // countryMapping[country.calling_code]  = country;
  countryMapping[country.city] = country;
  if (country.currency_code) {
    if (!countryMapping[country.currency_code]) {
      countryMapping[country.currency_code] = [country];
    } else {
      countryMapping[country.currency_code].push(country)
    }
  }


  if (country.independence) {
    if (!countryMapping[country.independence]) {
      countryMapping[country.independence] = [country];
    } else {
      countryMapping[country.independence].push(country)
    }
  }
  // countryMapping[country.independence]  = country;
});

/* GET home page. */ //================================
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
// =======================================================

router.get('/countries', function (req, res, next) {
  res.json({
    res: countries,
    countries,
    //   abbr  : abbr,
    // calling : calling,
    // capital : capital,
    // currencyName : currencyName


  })
});
//================================================================

router.get('/countries/search', function (req, res, next) {
  const query = req.query // query param
  console.log(query)

  const search = countries.filter(function (item) {
    return item.country_code === query.country_code
  })
  res.json({
    res: search,

  })
});

///=====================================================================


router.get('/countries/search2', function (req, res, next) {
  const query = req.query // query param
  const name = query.name;


  if (typeof + query.value === "number" && !!(+query.value)) {
    query.value = +query.value;
  }

  let search = []
  // if(query.name === "calling_code"){
  search = countries.filter(function (item) { //looping over the array

    return item[name] === query.value;
  })
  //},
  // if(query.name === "country_code"){
  //   search =countries.filter(function(item){
  //     return item.country_code === query.value; 
  //   })
  // }

  res.json({
    res: search,

  });
});


// router.get('/abbr/calling', function(req, res, next) {
//   res.json(calling)
// });
// router.get('/abbr/calling/capital', function(req, res, next) {
//   res.json(capital)
// });
// router.get('/abbr/calling/capital/currency', function(req, res, next) {
//   res.json(currencyName)
// });
//==========================================================================================
router.get('/country-lookup', function (req, res, next) {
  res.json({
    res: countryMapping,
  })
});



router.get('/country/lookup', function (req, res, next) {
  const lookupKey = req.query.lookupKey;
  const country = countryMapping[lookupKey];
  res.json({
    total: country && country.length,
    res: country && country || {}
  })
});




module.exports = router;