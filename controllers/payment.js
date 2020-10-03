

var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "9zxqn4v4syxr3njh",
  publicKey: "wf2d5tmrg4d82j38",
  privateKey:  "f234cdaf93504c4f376bc71f5bedd87a"
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({} , function (err, response) {
        if(err) {
            res.status(500).send(err)
        } else {
            res.send(response);
        }
    });
};

exports.processPayment = (req, res) => {
    
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,

        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          if(err) {
              res.status(500).send(err)
          } else{
              res.send(result);
          }
      });
};