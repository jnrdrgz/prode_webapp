export const validateIsfilled = expression => expression && (expression.length > 0 || expression > 0);

export const required = value => (validateIsfilled(value) ? undefined : "Campo requerido")

export const validateOnlyNumber = (num = null, allowNegative = false) => {
  // const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;  // For phonenumber //TODO: test it
  // allowNegative /^-? 
  const regex = /^(?:\d+)(?:(\.|,)\d+)?$/
  return regex.test(num);
  // if (num === null) return false;
  // return !isNaN(num);
};

export const requiredAndOnlyNumber = value => (validateIsfilled(value) && validateOnlyNumber(value) ? undefined : "Campo requerido")

export const composeValidators = (...validators) => value => validators.reduce((error, validator) => error || validator(value), undefined)

export const getColorScore = (userScore, realScore) => {
	if(!userScore) return ""
	if(!realScore) return ""
	if(userScore === realScore){
		return "bg-lime-600"
	}

	let ulocal = userScore.split("-")[0]
	let uvisitante = userScore.split("-")[1]
	let rlocal = realScore.split("-")[0]
	let rvisitante = realScore.split("-")[1]


	if(ulocal === uvisitante && rlocal === rvisitante){
		return "bg-yellow-600"
	}

	if(parseInt(ulocal) > parseInt(uvisitante) && parseInt(rlocal) > parseInt(rvisitante)){
		return "bg-yellow-600"
	}

	if(parseInt(ulocal) < parseInt(uvisitante) && parseInt(rlocal) < parseInt(rvisitante)){
		return "bg-yellow-600"
	}

	return ""
}