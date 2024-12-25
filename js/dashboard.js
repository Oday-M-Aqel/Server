const container = document.getElementById("container");

// for Responsive Mobile View Header
const toggleSidebar = () => {
  document.getElementById("sidebar").classList.toggle("show");
};

window.onload = async () => {
  await renderOverview();
};

//back to home page function
const backToHomePage = () => {
  window.location.href = "homepage";
};

const logOut = () => {
  //logOUt function
};
