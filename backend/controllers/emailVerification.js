require('dotenv').config();
var AWS = require('aws-sdk');
const bcrypt = require('bcrypt');
const moment  = require('moment');
const crypto = require('crypto');



async function sentEmail(email){
    
    const time = Math.floor((new moment())/300000);

    const hash = crypto.createHash('sha1').update((email+time+"sjfgjsdfksjd")).digest('hex');
    const accessCode = hash.substring(30,36);   

    // Load the AWS SDK for Node.js
    
    // Set the region 
    AWS.config.update({region: 'eu-central-1'});

    // Create sendEmail params 
    var params = {
    Destination: { /* required */
   
        ToAddresses: [
        `${email}`,
        /* more items */
        ]
    },
    Message: { /* required */
        Body: { /* required */
        Html: {
        Charset: "UTF-8",
        Data: `UNILEAGUE için doğrulama kodunuz: ${accessCode} Kod 5 dakika içinde geçersiz olacaktır. Eğer bu kodu siz istemediyseniz lütfen bu maili dikkate almayınız.`
        },
        Text: {
        Charset: "UTF-8",
        Data: "TEXT_FORMAT_BODY"
        }
        },
        Subject: {
        Charset: 'UTF-8',
        Data: 'Email Verification Code'
        }
        },
    Source: 'info@civitaseterna.com' /* required */

    };

    // Create the promise and SES service object
    var sendPromise = new AWS.SES().sendEmail(params).promise();

    // Handle promise's fulfilled/rejected states
    sendPromise.then(
    function(data) {
        console.log(data.MessageId);
    }).catch(
        function(err) {
        console.error(err, err.stack);
    });
}

module.exports  = {sentEmail};