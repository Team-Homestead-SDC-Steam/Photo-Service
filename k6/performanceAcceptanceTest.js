
// important info:
// error rate
// rps

// k6 run --out csv=01_unclustered.csv performanceAcceptanceTest.js 
// k6 run --out json=01_unclustered.json performanceAcceptanceTest.js 

import { check, group, sleep } from 'k6';
import http from 'k6/http';


export let options = {
  max_vus: 100,
  vus: 100,
  stages: [
    { duration: "6s", target: 10 },
    { duration: "60s", target: 100 },
    { duration: "6s", target: 0 }
  ],
  thresholds: {
    "RTT": ["avg<1000"]
  }
}

export default function() {
  group('v1 API testing', function() {
    group('endpoint connection test', function() {
      let res = http.get(`http://localhost:3004/api/media/${ Math.floor( Math.random( )*5000000 )+5000000}`);
      check(res, {
        "status is 200": (r) => r.status === 200,
        "returns properly formatted JSON": (r) =>  r.body.substring(0, 7) === `{"_id":` 
      });
    });
  });
  sleep(1);
}
