const https = require('https');

https.get('https://coderbyte.com/api/challenges/json/age-counting', (resp) => {
  
  let data = '',
      arr,
      count = 0;

  // parse json data here...
  resp.on('data', (chunk) => {
    data += chunk;
    //count = 0;
    //arr = data.split(/,|=/);
    //arr.map((value) => {
    //    if(!isNaN(value) && value >= 50) count++;
    //})
    //console.log('on --> ' + count);
  });
  

  resp.on('end', () => {
    console.log(JSON.parse(data));
    // arr = '{' + JSON.parse(data).data.replace(/([^,]+)=([^,]+)/g, '"$1":"$2"').replace(/ /g, '') + '}';
    arr = JSON.parse(data).data.split(/,|=/);
    arr.map((value) => {
      if(!isNaN(value) && value >= 50) count++;
    })
    //console.log('end');
    console.log('end --> ' + count);
    return count;
  });

}).on('error', (err) => {
  console.log('Error: ' + err.message);
});