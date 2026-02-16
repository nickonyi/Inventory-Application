let pendingForm = null;
let pendingSelector = null;
let pendingAction = null;
let pendingMessage = "";

const openAdminModal = (form, selector, options = {}) => {
  const modal = document.querySelector("#admin-password-modal");
  const input = document.querySelector("#adminPasswordInput");
  const error = document.querySelector("#adminPasswordError");
  const confirmBtn = document.querySelector("#adminPasswordConfirm");

  if (!modal) {
    const promptMessage = options.message || "Input your password";
    const password = prompt(promptMessage);
    if (password === null) return false;
    form.querySelector(selector).value = password;
    return true;
  }

  pendingForm = form;
  pendingSelector = selector;
  pendingAction = options.action || null;
  pendingMessage = options.message || "";
  modal.classList.add("flex");
  modal.classList.remove("hidden");
  input.value = "";
  error.textContent = "";

  if (confirmBtn) {
    confirmBtn.textContent = options.confirmText || "Confirm";
    if ((options.confirmText || "").toLowerCase() === "delete") {
      confirmBtn.classList.remove("bg-blue-600");
      confirmBtn.classList.add("bg-red-6000");
      confirmBtn.classList.add("hover:bg-red-700");
      confirmBtn.classList.remove("hover:bg-blue-700");
    } else {
      confirmBtn.classList.remove("bg-red-600");
      confirmBtn.classList.remove("hover:bg-red-700");
      confirmBtn.classList.add("bg-blue-600");
      confirmBtn.classList.add("hover:bg-blue-700");
    }
  }

  modal.classList.add("flex");
  modal.classList.remove("hidden");

  input.focus();
  return false;
};

const handleEditAction = (form) => {
  openAdminModal(form, "#adminPasswordField");
  return false;
};

const closeAdminModal = () => {
  const modal = document.getElementById("admin-password-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  pendingForm = null;
  pendingSelector = null;
  pendingAction = null;
  pendingMessage = "";
  const confirmBtn = document.getElementById("adminPasswordConfirm");
  if (confirmBtn) {
    confirmBtn.textContent = "Confirm";
    confirmBtn.classList.remove("bg-red-600", "hover:bg-red-700");
    confirmBtn.classList.add("bg-blue-600", "hover:bg-blue-700");
  }
};
const confirmAdminModal = () => {
  const input = document.getElementById("adminPasswordInput");
  const error = document.getElementById("adminPasswordError");
  const password = input && input.value ? input.value.trim() : "";
  if (!password) {
    if (error) {
      error.textContent = "password field cannot  be empty";
    }
    return;
  }

  if (pendingForm && pendingSelector) {
    const field = pendingForm.querySelector(pendingSelector);

    if (field) {
      field.value = password;
    }
    const formToSubmit = pendingForm;
    closeAdminModal();
    formToSubmit.submit();
  }
};

// Wire modal buttons and keyboard interactions after DOM loads
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("admin-password-modal");
    const overlay = modal && modal.querySelector('[data-action="close-modal"]');
    const cancelBtn = document.getElementById("adminPasswordCancel");
    const confirmBtn = document.getElementById("adminPasswordConfirm");
    const input = document.getElementById("adminPasswordInput");

    if (overlay) overlay.addEventListener("click", closeAdminModal);
    if (cancelBtn) cancelBtn.addEventListener("click", closeAdminModal);
    if (confirmBtn) confirmBtn.addEventListener("click", confirmAdminModal);
    if (input) {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") confirmAdminModal();
        if (e.key === "Escape") closeAdminModal();
      });
    }

    // Also close modal with Escape key globally
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeAdminModal();
    });
  });
}
