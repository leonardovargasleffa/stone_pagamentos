## Stone

Client para a API V1.1 da Stone Pagamentos em Node.Js

## Instalação
```js
npm install --save stone_pagamentos
```

## Como utilizar?

### Iniciando
```js
var paramsStone = {
'MerchantKey': 'xxxxxxxxxxxxxxxxxxxxxxx',
'sandbox': true // Opcional - Ambiente de Testes
}

var stone = require('stone')(paramsStone);
```

## Cartão de Crédito

### Criando uma transação
```js
var dadosSale = {
"CreditCardTransactionCollection": [
{
"AmountInCents": "100", //Em centavos
"CreditCard": {
"CreditCardBrand": "Visa",
"CreditCardNumber": "CARTAO",
"ExpMonth": "MES VENCIMENTO",
"ExpYear": "ANO VENCIMENTO",
"HolderName": "NOME NO CARTAO",
"SecurityCode": "CODIGO DE SEGURANÇA"
},
"InstallmentCount": 1, //PARCELAS
"Options":{
"CurrencyIso":"BRL",
"SoftDescriptorText": "NOME QUE APARECE NA FATURA DO CLIENTE"
}
}
],
"Order": {
"OrderReference": order
}
};

stone.creditCard.simpleTransaction(dadosSale, function(err, data){
if (err){
return console.error('ERRO', err);
} else {

var retorno = JSON.parse(data);

if(retorno.ErrorReport != null){ //ERRO NA REQUISIÇÃO
    //retorno.ErrorReport.ErrorItemCollection[0].Description = DESCRICAO DO ERRO

} else {

var check = stone.checkPaymentStone(retorno.CreditCardTransactionResultCollection[0].AcquirerReturnCode);

if(check[1] == false){ //ERRO NO PAGAMENTO
    //check[0] = MENSAGEM DE ERRO
    
} else {
    //PAGAMENTO AUTORIZADO
}

}

})
```

### Capturando uma venda
```js
var dadosSale = {
OrderKey: '01df6e28-6ddd-45db-a095-903c1adb170a'
}

stone.creditCard.captureSale(dadosSale, function(err, data){
if (err){
return console.error('ERRO', err);
}
return console.log(data);
})
```

### Cancelando uma venda
```js
var dadosSale = {
OrderKey: '01df6e28-6ddd-45db-a095-903c1adb170a'
}

stone.creditCard.cancelSale(dadosSale, function(err, data){
if (err){
return console.error('ERRO', err);
}
return console.log(data);
})
```

## API Reference

Consulte os campos necessários na documentação da Stone Pagamentos

[PT-Br](http://gateway.stone.com.br/v1.1/docs)


## Autor

Pinmyspot <[contato@pinmyspot.com.br](mailto:contato@pinmyspot.com.br)>

[Site Oficial](http://pinmyspot.com.br/)

[Github](https://github.com/pinmyspot.com.br)

[Twitter](http://twitter.com/pinmyspot)

[Instagram](http://instagram.com/pinmyspot)

[Facebook](http://facebook.com/pinmyspot)

## License

MIT License

Copyright (c) 2017 banzeh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
