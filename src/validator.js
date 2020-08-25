
//Email validation
const emailValidator = email => {
    let emailRegEx = /\S+@\S+\.\S+/
    if(emailRegEx.test(email)){
        return true
    }
    return false
}


//validation check for properties of json
const validationCheck = expectedProps => {
    return function (req, res, next) {
        //expectedProps are the properties we expect from post request
        //submittedProps are properties in the body

        // find any properties from submittedProps that is missing from expectedProps
        let submittedProps = Object.keys(req.body)
        let errors = expectedProps.filter(x => !submittedProps.includes(x))
        
        //if email has an error and email is not undefined then put email as error. Undefined is used to avoid duplicate email errors.
        if(!emailValidator(req.body.email) && typeof req.body.email != "undefined"){
            errors.push('email')
        }

        //if password is included in submittedProps and came in from user route and has less than 8 characters
        if (submittedProps.indexOf('password') > -1 && req.body.password.length < 8){
            errors.push('password')
        }

        //return status error if any errors found
        if (errors.length > 0) {
            return res.status(400).send({ message: 'validation error', invalid: errors })
        }
        next()
    }
}


export {
    validationCheck
}