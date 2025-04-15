export function formatPhoneNumber(input: string,format:string | undefined) {
    // Remove non-digit characters from input
    let phoneNumber: any = input?.replace(/\D/g, '');
    if (phoneNumber?.length <= 3) {
        phoneNumber = `(${phoneNumber}`;
    } else if (phoneNumber?.length <= 6) {
        phoneNumber = `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(
            3
        )}`;
    } else if (phoneNumber?.length <= 10) {
        phoneNumber = phoneNumber = `(${phoneNumber.substring(
            0,
            3
        )}) ${phoneNumber.substring(3, 6)} - ${phoneNumber.substring(6, 10)}`;
    } else {
        phoneNumber = phoneNumber?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }

    // Match the phone number pattern
    const phoneNumberPattern = /^\(\d{3}\) ?\d{3} ?- ?\d{4}$/;

    if (format === 'international') { 
        if (phoneNumberPattern.test(phoneNumber)) {
            return { value: phoneNumber, isValid: true };
        } else {
            return { value: phoneNumber, isValid: false };
        }
    }
    else{
        if (getPhoneNumberLength(phoneNumber)<10 || getPhoneNumberLength(phoneNumber)>15) {
            return { value: phoneNumber, isValid: false };
        }
        else{
            return { value: phoneNumber, isValid: true };
        }
    }
}


function getPhoneNumberLength(phoneNumber:string) {
  const digits = phoneNumber.match(/\d/g);
  return digits ? digits.length : 0;
}