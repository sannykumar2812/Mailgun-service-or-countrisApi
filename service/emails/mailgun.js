require('dotenv').config();

const DOMAIN = process.env.MAILGUN_DOMAIN
const API_KEY = process.env.MAILGUN_KEY;
const mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});


// const payload = {
//         from: `sunnykusingh2812@gmail.com`,
//         to: `sunnykusingh2812@gmail.com`,
//         subject:`This email is sent from code`,
//         text:`This email is sent from code base\n -SANNNY`
//     }


function send(payload)  {
    mailgun.messages().send(payload, function(err, response){
        if(err){
            console.log(err);
        }else{
            console.log(response)
        }
    });

}
module.exports = send;

