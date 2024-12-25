module.exports.signup = (req, res) => {
  res.render("register");
};

module.exports.login = (req, res) => {
  res.render("login");
};

module.exports.adminDashboard = (req, res) => {
  res.render("admin-dashboard");
};

module.exports.userDashboard = (req, res) => {
  res.render("dashboard");
};

module.exports.checkOut = (req, res) => {
  res.render("checkOut");
};

module.exports.cartPage = (req, res) => {
  res.render("cart");
};

module.exports.consultation = (req, res) => {
  res.render("Consultation");
};

module.exports.addProduct = (req, res) => {
  res.render("add-product");
};

module.exports.details = (req, res) => {
  res.render("details");
};

module.exports.product = (req, res) => {
  res.render("product");
};

module.exports.subscription = (req, res) => {
  res.render("Subscription");
};

module.exports.homepage = (req, res) => {
  res.render("index");
};


