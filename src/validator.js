//validation check for properties of json
const validationCheck = route => {
    return function (req, res, next) {
        
        //sets key1 as properties we are expecting
        const key1 = [];
        if (route === 'contact'){
            key1.push('name', 'email', 'phoneNumber', 'content')
        } 
        if (route === 'user') {
            key1.push('name', 'password', 'email')
        } 

        //sets key2 as properties in the body then filters for what is not in key1
        let key2 = Object.keys(req.body)
        let errors = key1.filter(x => !key2.includes(x))

        //if email is included in key2, perform validation of email format
        if (key2.indexOf('email') > -1) {
            let emailRegEx = /\S+@\S+\.\S+/
            if (!emailRegEx.test(req.body.email)) {
                errors.push('email')
            }
        }

        //if password is included in key2 and came in from user route and has less than 8 characters
        if (key2.indexOf('password') > -1 && route ==='user' && req.body.password.length < 8){
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