const validate = (obj) => {
  // replace the empty field by null value
  const project = {};
  for (let key in obj) {
    if (obj[key] === "") {
      return `project need a ${key}`;
    } else {
      project[key] = obj[key];
    }
  }
  return project;
};

module.exports = validate;
