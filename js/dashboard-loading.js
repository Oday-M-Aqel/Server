// Show the loading spinner
const activeLoading = () => {
  const spinner = document.getElementById("pageLoadingSpinner");
  if (spinner) spinner.style.display = "flex";
};

// Hide the loading spinner
const disableLoading = () => {
  const spinner = document.getElementById("pageLoadingSpinner");
  if (spinner) spinner.style.display = "none";
};
