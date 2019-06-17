### JekyllPay, the payment management system of choice
 - the `Jekyll Pay` API server
 - Implemented in Node.js
 - Based on Koa2 framework

### Getting Started

#### Installation

```bash
  - mkdir my-project && cd my-project
  - git clone git@github.com:jekyllpay/jekyllpay-server-nodejs.git .
  - yarn install
  - yarn orm db:migrate
  - node src/bin/gateway <gateway name> // stripe, paypal, etc
  - yarn jp:node
```

#### API Reference
 - [Jekyll Pay Documentation](https://docs.jekyllpay.com)

#### Supported Gateways
 - [x] Stripe
 - [ ] Braintree

### Supported Payment Methods
 - [x] Credit Card, Visa
 - [x] Credit Card, MasterCard
 - [ ] Credit Card, American Express

### LICENSE
 - [Apache 2.0](LICENSE)