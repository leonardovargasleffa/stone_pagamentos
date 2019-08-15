const request = require('request');
const fs = require("fs")

module.exports = function (params) {

	var options = {
		url: 'https://transaction.stone.com.br',
		encoding: 'utf-8',
	    json: true,
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'MerchantKey': (params.sandbox ? "f2a1f485-cfd4-49f5-8862-0ebc438ae923" : params.MerchantKey)
		}
	};

	var Sale = function (data, callback) {

		if(params.sandbox){
			if(data.CreditCardTransactionCollection[0].Options != null){
				data.CreditCardTransactionCollection[0].Options.PaymentMethodCode = 1;
			} else {
				data.CreditCardTransactionCollection[0].Options = {
                    "CurrencyIso":"BRL",
                    "PaymentMethodCode":1
                };
			}
		}

		var string_data = JSON.stringify(data);
		options.headers['Content-Length'] = Buffer.byteLength(string_data);

		const request_options = options;
		request_options.url += '/Sale/';
		request_options.body = data;
		request_options.method = 'POST';

		request(request_options, function (error, response, body) {
				console.info(error);
				console.info('========');
				console.info(body);
			  if (!error && response.statusCode == 201) {
			    callback(null, body);
			    return;
			  } else {
		  		callback(error, null);
		  		return;
			  }
		});

	}
	
	var captureSale = function(data, callback){

		var string_data = JSON.stringify(data);
		options.headers['Content-Length'] = Buffer.byteLength(string_data);

		const request_options = options;
		request_options.url += '/Sale/Capture/';
		request_options.body = data;
		request_options.method = 'POST';

		request(request_options, function (error, response, body) {
			  if (!error && response.statusCode == 200) {
			    callback(null, body);
			    return;
			  } else {
		  		callback(error, null);
		  		return;
			  }
		});

	}

	/**
	 * Cancela a venda - Dá preferencia para cancelar pelo paymentId, se não existir, utiliza o OrderId
	 * @param {object} data 
	 * @param {callback} callback 
	 */
	var cancelSale = function(data, callback){

		var string_data = JSON.stringify(data);
		options.headers['Content-Length'] = Buffer.byteLength(string_data);

		const request_options = options;
		request_options.url += '/Sale/Cancel/';
		request_options.body = data;
		request_options.method = 'POST';

		request(request_options, function (error, response, body) {
			  if (!error && response.statusCode == 200) {
			    callback(null, body);
			    return;
			  } else {
		  		callback(error, null);
		  		return;
			  }
		});

	}

	var checkPaymentStone = function(code){
		switch(parseInt(code)){
			case 1000:	
				return ["Não aprovado",false];
			break;
			case 1001:	
				return ["Cartão vencido",false];
			break;
			case 1002:	
				return ["Suspeita de fraude",false];
			break;
			case 1003:	
				return ["Estabelecimento entrar em contato com emissor",false];
			break;
			case 1004:	
				return ["Cartão com restrição",false];
			break;
			case 1005:	
				return ["Estabelecimento entrar em contato com departamento de segurança do adquirente",false];
			break;
			case 1006:	
				return ["Tentativas de senha excedidas",false];
			break;
			case 1007:	
				return ["Consultar o emissor",false];
			break;
			case 1008:	
				return ["Consultar as condições especiais do emissor",false];
			break;
			case 1009:	
				return ["Estabelecimento inválido",false];
			break;
			case 1010:	
				return ["Valor inválido",false];
			break;
			case 1011:	
				return ["Cartão inválido",false];
			break;
			case 1012:	
				return ["Senha necessária",false];
			break;
			case 1014:	
				return ["Nenhuma conta do tipo selecionado",false];
			break;
			case 1015:	
				return ["Função selecionada não suportada",false];
			break;
			case 1016:	
				return ["Saldo insuficiente",false];
			break;
			case 1017:	
				return ["Senha inválida",false];
			break;
			case 1019:	
				return ["Transação não permitida para o portador",false];
			break;
			case 1020:	
				return ["Transação não permitida para o terminal",false];
			break;
			case 1021:	
				return ["Limite de valor para saque excedido",false];
			break;
			case 1022:	
				return ["Violação de segurança",false];
			break;
			case 1023:	
				return ["Limite de quantidade de saques excedido",false];
			break;
			case 1024:	
				return ["Violação da lei",false];
			break;
			case 1025:	
				return ["Cartão bloqueado",false];
			break;
			case 1026:	
				return ["Dados de senha inválidos",false];
			break;
			case 1027:	
				return ["Erro no tamanho da senha",false];
			break;
			case 1028:	
				return ["Erro de sincronia de chave de senha",false];
			break;
			case 1029:	
				return ["Suspeita de cartão falso",false];
			break;
			case 1030:	
				return ["Moeda inaceitável para o emissor",false];
			break;
			case 1032:	
				return ["Cartão perdido ou roubado",false];
			break;
			case 1035:	
				return ["Conta encerrada",false];
			break;
			case 1036:	
				return ["Conta poupança encerrada ou bloqueada para encerramento",false];
			break;
			case 1037:	
				return ["Conta de crédito encerrada ou bloqueada para encerramento",false];
			break;
			case 1039:	
				return ["Conta corrente encerrada ou bloquada para encerramento",false];
			break;
			case 1041:	
				return ["Status ruim para conta de origem",false];
			break;
			case 1042:	
				return ["Status ruim para conta de destino",false];
			break;
			case 1045:	
				return ["Código de segurança inválido",false];
			break;
			case 1047:	
				return ["Troca de senha necessária",false];
			break;
			case 1048:	
				return ["Nova senha inválida",false];
			break;
			case 1057:	
				return ["Data de pagamento inválida",false];
			break;
			case 1060:	
				return ["Transação não completou normalmente no terminal",false];
			break;
			case 1061:	
				return ["Transação não suportada pelo emissor",false];
			break;
			case 1062:	
				return ["Saque fácil não disponível",false];
			break;
			case 1063:	
				return ["Limite de saque fácil excedido",false];
			break;
			case 1064:	
				return ["Negado offline pelo terminal",false];
			break;
			case 1065:	
				return ["Negado, não foi possível processar offline",false];
			break;
			case 2000:	
				return ["Não aprovado",false];
			break;
			case 2001:	
				return ["Cartão vencido",false];
			break;
			case 2002:	
				return ["Suspeita de fraude",false];
			break;
			case 2003:	
				return ["Estabelecimento entrar em contato com emissor",false];
			break;
			case 2004:	
				return ["Cartão com restrição",false];
			break;
			case 2005:	
				return ["Estabelecimento entrar em contato com departamento de segurança do adquirente",false];
			break;
			case 2006:	
				return ["Tentativas de senha excedidas",false];
			break;
			case 2007:	
				return ["Condições especiais",false];
			break;
			case 2008:	
				return ["Cartão perdido",false];
			break;
			case 2009:	
				return ["Cartão roubado",false];
			break;
			case 2010:	
				return ["Suspeita de cartão falso",false];
			break;
			case 2011:	
				return ["Limite de quantidade de saques excedido",false];
			break;
			case 2012:	
				return ["Limite de valor para saque excedido",false];
			break;
			case 9100:	
				return ["Erro no formato da mensagem",false];
			break;
			case 9102:	
				return ["Transação inválida",false];
			break;
			case 9103:	
				return ["Tente novamente",false];
			break;
			case 9105:	
				return ["Adquirente não suportado pelo switch",false];
			break;
			case 9107:	
				return ["Emissor fora de operação",false];
			break;
			case 9108:	
				return ["Não foi possível enviar a transação para o destinatário",false];
			break;
			case 9109:	
				return ["Erro no sistema",false];
			break;
			case 9110:	
				return ["Emissor se desconectou",false];
			break;
			case 9111:	
				return ["Emissor não respondeu em tempo",false];
			break;
			case 9112:	
				return ["Emissor indisponível",false];
			break;
			case 9113:	
				return ["Transmissão duplicada",false];
			break;
			case 9114:	
				return ["Não foi possível encontrar a transação original",false];
			break;
			case 9116:	
				return ["MAC incorreto",false];
			break;
			case 9117:	
				return ["Erro de sincronização de chave de MAC",false];
			break;
			case 9118:	
				return ["Nenhuma chave de comunicação disponível",false];
			break;
			case 9119:	
				return ["Erro de sincronização de chave de encriptação",false];
			break;
			case 9120:	
				return ["Erro de segurança de software/hardware, tente novamente",false];
			break;
			case 9121:	
				return ["Erro de segurança de software/hardware",false];
			break;
			case 9122:	
				return ["Número da mensagem fora de sequência",false];
			break;
			case 9123:	
				return ["Requisição em progresso",false];
			break;
			case 9124:	
				return ["Código de segurança inválido",false];
			break;
			case 9125:	
				return ["Erro no banco de dados",false];
			break;
			case 9132:	
				return ["Erro nos dados de recorrência",false];
			break;
			case 9133:	
				return ["Atualização não permitida",false];
			break;
			case 9350:	
				return ["Violação de acordo comercial",false];
			break;
			case 9999:	
				return ["Erro não especificado",false];
			break;
			default: 
				if(code == 0 || code == 1){
					return ["Transação Autorizada com sucesso!", true];
				} else {
					return ["Erro não especificado",false];
				}
			break;
		}
	};

	return {
		creditCard: {
			Sale: Sale,
			captureSale: captureSale,
			cancelSale: cancelSale
		},
		checkPaymentStone: checkPaymentStone
	}
}