const getCurrency = (currency: string) => {
  switch (currency) {
    case "czk":
      return "Kč";
      break;
    case "usd":
      return "$";
      break;
    case "eur":
      return "€";
      break;
    default:
      break;
  }
};

export default getCurrency;
