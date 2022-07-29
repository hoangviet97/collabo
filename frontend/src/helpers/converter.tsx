export const getPriorityName = (priority: string) => {
  let name = "";
  switch (priority) {
    case "0":
      name = "Low";
      break;
    case "1":
      name = "Medium";
      break;
    case "2":
      name = "High";
      break;
    default:
      break;
  }

  return name;
};
