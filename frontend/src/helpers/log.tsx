import color from "../styles/abstract/variables.module.scss";

export const getParams = (text: string) => {
  const taskName: any = text.match(/^~.*\.~$/);
  let pom: any | null = "";
  let type: any | null = "";
  let fulltext: any | null = "";

  const getType = (type: string) => {
    switch (type) {
      case "@":
        return "Task";
      case "$":
        return "Session";
      default:
        break;
    }
  };

  if (taskName !== null) {
    const val = taskName[0][1]; //get type
    type = getType(val);
    pom = taskName[0].replace(`~${val}`, "");
    fulltext = text.replace(`~${val}`, "");
  }

  return { type: type, pom: pom, fulltext: fulltext };
};

export const getTypeColor = (type: string) => {
  switch (type) {
    case "task":
      return color.normal_orange;
    case "session":
      return color.normal_blue;
    default:
      break;
  }
};
