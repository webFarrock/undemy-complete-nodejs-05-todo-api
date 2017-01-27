const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123asdf';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log('hash: ',hash);
    });
});



let hp = '$2a$10$n5A9Ge12vkJiZu/IqTNAU0e4fCLyK8CVyiS3mw9Sa.mdBQoElx93u6';

bcrypt.compare(password, hp, (err, res) => {
    if(res) console.log('++++');
    if(!res) console.log('---');
});

/*
let data = {
    id: 10
};

let token = jwt.sign(data, 'secretcode');

console.log('token, ', token);

let decoded = jwt.verify(token, 'secretcode');
console.log('decoded: ', decoded);
*/
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