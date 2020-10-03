import http from 'k6/http';
import { sleep, check } from 'k6';

const rnd = n => Array.isArray(n) ? n[rnd(n.length) - 1] : Math.floor(Math.random() * n) + 1;

export let options = {
    rps: 1000000,
    stages: [
        {duration: '10s', target: 1000},
        {duration: '10s', target: 2000},
        {duration: '10s', target: 5000},
        {duration: '10s', target: 10000}
      ]
};
export default function() {
    let res = http.get(`http://localhost:3004/api/media/${rnd(5000000)+500000}`);
    check(res, { 'status was 200': r => r.status == 200 });
    sleep(1);
}