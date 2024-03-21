const convertPhoneToISO = (number, countryCode = "234") => {
    if (!number) return "";
    if (number.substring(0, 4) === `+${countryCode}`) {
      return number;
    } else if (number.substring(0, 3) === countryCode) {
      return `+${number}`;
    } else if (number.charAt(0) === "0") {
      return `+${countryCode}${number.slice(1)}`;
    } else {
      return null;
    }
  };

  export default {
    convertPhoneToISO
  }