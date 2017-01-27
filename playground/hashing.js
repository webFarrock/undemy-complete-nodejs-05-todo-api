const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = {
    id: 10
};



let token = jwt.sign(data, 'secretcode');

console.log('token, ', token);

let decoded = jwt.verify(token, 'secretcode');
console.log('decoded: ', decoded);

/*
let message = 'I am user number 3';
let hash = SHA256(message).toString();

console.log('message:',message);
console.log('hash:',hash);

let data = {
    id: 4,
}

let token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'mysalt-secretcode').toString()
}

let resultHash = SHA256(JSON.stringify(token.data) + 'mysalt-secretcode').toString();

if(resultHash === token.hash){
    console.log('data was not changed');
}else{
    console.log('data was changed. Do not trust!');
}

*/