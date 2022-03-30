const https = require('https');

https.get('https://coderbyte.com/api/challenges/json/age-counting', (resp) => {
  
  let data = '',
      arr,
      count;

  // parse json data here...
  resp.on('data', (foo) => {
    data += foo;
    count = 0;
    //data = data.replace(/{"data":"/g, '').replace(/"}/g, '');
    //data = data.replace(/{"data":"/g, '').replace(/"}/g, '').replace(/=/g, ':').replace(/ /g, '');
    //data = '{' + data + '}';    
    arr = data.split(/,|=/);
    arr.map((value) => {
        if(!isNaN(value) && value >= 50) count++;
    })
    console.log('on --> ' + count);
  });
  

  resp.on('end', () => {
    //console.log(JSON.parse(data).explanation);
    //console.log('end');
    console.log('end --> ' + count);
    return count;
  });

}).on('error', (err) => {
  console.log('Error: ' + err.message);
});