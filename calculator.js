var memoryarr = [];
var mathExpression = '';
var lastInput = '';
var subTotal = 0;
var isExponential = false;
var isRoot = false;
var blank = " ";
var operation = document.getElementById('operation');
operation.innerHTML = '';
var result = document.getElementById('result');
result.innerHTML='';
var arrNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.'];
var arrop = ["*", '/', '+', '-', '^', 'sqr','%', 'm1', 'm2', 'm3'];

function submitValue(val){
	var hasOp = false;
	var isOp = false;
	var isPercentage = false;
	var lastValIsNum = false;
	var lastVal = parseFloat(mathExpression.slice(-1));

	if(isValid(val, lastInput)){
		lastInput = val;
		
		for(var i = 0; i<mathExpression.length; i++){
			if(arrop.indexOf(mathExpression[i]) !== -1){
				hasOp = true;
				break;
			}
		}
		if (arrop.indexOf(val) !== -1){
			isOp = true;
			if(val === '^'){
				isExponential = true;
			}

			if(val === 'sqr'){
				isRoot = true;
			}

			if(val === '%'){
				isPercentage = true;
			}

		}
		// var lastValIsNum = isNumber(lastVal); fast way to do it
		if(isNumber(lastVal) === true) {
			lastValIsNum = true;
		}
		if (hasOp && isOp && lastValIsNum) {
			subTotal = equal();
			mathExpression = subTotal + val;
			operation.innerHTML = mathExpression;
		} else {
			mathExpression += val;
			operation.innerHTML = mathExpression;
		}
	}   
}

function isNumber(input){
	// returns true or false
	return arrNum.indexOf(input) !== -1;
}

function isOperator(input){
	return arrop.indexOf(input) !== -1;
}

function isValid(val, lastInput){
	if(lastInput === '' &&  !isNumber(val) && val !== '-'){
		return false;
	} 
	else if(lastInput === ''){
		return true;

	}
	else if(isOperator(lastInput) && isOperator(val)){
		return false;
	}
	else if(isOperator(lastInput) && isNumber(val)){
		return true;
	}
	else if(isNumber(lastInput)){
		return true;
	}
	else{
		return false;
	}
}

function clearScreen(){
	mathExpression = '';
	lastInput = '';
	operation.innerHTML='';
	result.innerHTML = '';
}

function submitMemory(val){
	
	if(val === 'm1'){
		val = memoryarr[0];
	} else if (val === 'm2'){
		val = memoryarr[1];
	} else{ 
		val = memoryarr[2];
	}
	submitValue(val);

}

function deleteFunction(){
	mathExpression.substr(mathExpression.length-1, mathExpression.length);
	submitValue();
}

function equal(){
	var evaluate;
	if(isExponential === true){
		var expoarr = mathExpression.split('^');
		evaluate = Math.pow(expoarr[0], expoarr[1]);
		isExponential = false;

	} else if (isRoot === true){
		var rootarr = mathExpression.split('sqr');
		evaluate = Math.round(Math.pow(rootarr[0], 1/rootarr[1]));
		isRoot = false;
	} else if (isPercentage){
		var isPercentage = mathExpression.split('%');
		evaluate =(([0] / [1]) * 100);
		isPercentage = false;
	}

	else{
		evaluate = eval(mathExpression);
	}	
	result.innerHTML=evaluate;
	memoryarr.unshift(evaluate);
	if (memoryarr.length > 3){
		memoryarr.pop();
	}
	return evaluate;
};











