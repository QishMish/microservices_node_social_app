function getMethods(object) {
  return Object.getOwnPropertyNames(Object.getPrototypeOf(object)).filter(
    (m) => "function" === typeof object[m]
  );
}

module.exports = {
  getMethods,
};
