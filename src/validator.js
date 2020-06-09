const verifyEmail = email => {
    let emailRegEx = /\S+@\S+\.\S+/
    if (emailRegEx.test(email)) {
        return true
    }
}

//validation check for properties of json
const validationCheck = expectedKeys => {
    return function (req, res, next) {

        
        //sets userKeys as properties in the body then filters for what is not in expectedKeys
        let userKeys = Object.keys(req.body)
        let errors = expectedKeys.filter(x => !userKeys.includes(x))

        //if email is included in userKeys, perform validation of email format
        if (userKeys.indexOf('email') > -1) {
            if(!verifyEmail(req.body.email)) {
                errors.push('email')
            }
        }
        
        //if password is included in userKeys and has less than 8 characters
        if (userKeys.indexOf('password') > -1) {
            if (req.body.password.length < 8) {
                errors.push('password')
            }
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