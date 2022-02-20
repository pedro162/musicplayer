

//RETIRA A MASCARA DO VALOR MONETÁRIO
export const formataCalcCod= (number)=>
{
	try{
		//console.log(number)
			number = String(number);


			if(number.length == 0){
				//throw new Error('Parãmetro inválido');
			return 0;
			}
		
		if(number.indexOf(',') > -1){
			
			number = number.replace(/\./g, '');
			number = number.replace(/,/g, '.');
			
			let convertido = Number(number);
			if(! isNaN(convertido)){
				return convertido.toFixed(2);
			}else{
				return 0;
			}
			
			
		}
		let convertido = Number(number);
		
		if(! isNaN(convertido)){
			return convertido.toFixed(2);
		}
		
		return 0;
		
	}catch(e){

			console.log(e);
	}
}

//formata para dinheiro

//-------------- FAZ A FORMATAÇÃO PARA DINHEIRO ------------
export  const formatMoney = (amount, decimalCount = 2, decimal = ',', thousands = '.')=>{
	try{

		decimalCount = Math.abs(decimalCount);
		decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

		const negativeSing = amount < 0 ? '-' : '';

		let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
		let j = (i.length > 3) ? i.length % 3 : 0;

		let fomartted = negativeSing;
		fomartted += (j ? i.substr(0, j) + thousands : '');
		fomartted += i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands);
		fomartted += (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '');

		return fomartted;


	}catch(e){

		console.log(e);
	}


}

export const calculaTotalAdicionado = (dataCobrancasAdicionadas)=>{
	let totCob = 0;
	if(dataCobrancasAdicionadas && Array.isArray(dataCobrancasAdicionadas) && dataCobrancasAdicionadas.length > 0){
		
		for(let i=0; !(i == dataCobrancasAdicionadas.length); i++){
			let atual = dataCobrancasAdicionadas[i]
			if(atual && atual.hasOwnProperty('vr_liquido') && atual.vr_liquido >= 0){
				totCob += Number(atual.vr_liquido)
			}
		}
	}
	
	return totCob;
	
}