import color from "../styles/abstract/variables.module.scss";

export const getStatusColor = (status: string) => {
  switch (status) {
    case "4":
      return color.light_red;
    case "3":
      return color.light_green;
    case "2":
      return color.light_reef;
    case "1":
      return color.light_blue;
    case "5":
      return color.normal_orange;
    case "0":
      return color.normal_silver_2;
    default:
      break;
  }
};
