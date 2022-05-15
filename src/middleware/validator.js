const email_validator = require('email-validator');
const { PhoneNumberUtil } = require('google-libphonenumber');
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()

const isValidDetails = ((req, res, next) => {

    let message = "";
    const { email, password, first_name, last_name, phone, address } = req.body

    //function to validate email
    const isValidEmail = () => {
        message = "email is invalid"
        return email_validator.validate(email);
    }

    //function to validate password
    const isValidPassword = () => {
        if (password.trim().length < 5) {
            message = "password must be more than 5 characters"
            return false;
        } else {
            return true;
        }
    }

    //function to validate names and addresses
    const isValidNames = () => {
        if (first_name.length > 3 && last_name.length > 3 && address.length > 5) {
            return true;
        } else {
            message = "names and address must be greater than 3 characters."
            return false;
        }
    }

    // function to validate phone numbers
    const isValidPhoneNumber = () => {
        if (!isNaN(phone) && phone.length > 6) {
            return true;
        } else {
            message = "please enter a valid phone number";
            return false;
        }
    }


    //validate all details
    if (isValidPassword() && isValidEmail() && isValidNames() && isValidPhoneNumber()) {
        next()
    } else {
        res.status(400).json({ 'status' : 'error', 'error-message' : message });
    }

})

module.exports = isValidDetails;