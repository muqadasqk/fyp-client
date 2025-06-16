import capEach from "./capEach";
import splitCamelCase from "./splitCamelCase";

const readObjectValueByPath = (obj, path) => {
  return path.split('.').reduce((acc, part) => {
    const value = acc?.[part];

    if (["status", "type"].includes(part)) {
      return splitCamelCase(value);
    }

    if (part === "email") {
      return value;
    }

    return capEach(value);
  }, obj);
};

export default readObjectValueByPath;
