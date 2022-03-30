const https = require('https');

https.get('https://coderbyte.com/api/challenges/json/age-counting', (resp) => {
  
  let data = '',
      arr = [],
      count = 0;

  resp.on('data', (foo) => {
    data += foo;
  });

  resp.on('end', () => {
    arr = JSON.parse(data).data.split(/,|=/);
    arr.map((value) => {
      if(!isNaN(value) && value >= 50) { count++; }
    });
    console.log(count);
  });

}).on('error', (err) => {
  console.log('Error: ' + err.message);
});