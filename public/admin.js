const openAdminModal = (form, selector, options = {}) => {
  const modal = document.querySelector("#admin-password-modal");
  console.log(modal);

  if (!modal) {
    prompt("Get your password here nigga!!");
  }
  modal.classList.add("flex");
  modal.classList.remove("hidden");
};

const handleEditAction = (form) => {
  openAdminModal(form, "#adminPasswordField");
  return false;
};
