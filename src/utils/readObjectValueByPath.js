const readObjectValueByPath = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
};

export default readObjectValueByPath;