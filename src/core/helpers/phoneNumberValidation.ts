//Class for validating phone numbers
class PhoneNumberValidation {
  checkIfNumberIsLegit = (phoneNumber: string) => {
    //Regex to validate if a string contains only numbers
    const ONLY_NUMBER_REGEX = /^\d+$/;

    if (phoneNumber.length !== 9) return false;

    if (!phoneNumber.match(ONLY_NUMBER_REGEX)) return false;

    return true;
  };
  //Function for adding polish area code to the previously validated number
  addPolishAreaCodeToNumber = (validatedPhoneNumber: string) =>
    "48" + validatedPhoneNumber;
}

export default new PhoneNumberValidation();
