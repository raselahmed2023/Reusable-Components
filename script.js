
// 1. BUTTON COMPONENT


function createButton({
  text = "Button",
  variant = "primary",
  onClick = () => {},
  disabled = false,
}) {
  const button = document.createElement("button");

  button.type = "button";
  button.textContent = text;

  button.className = `ui-button btn-${variant}`;

  button.disabled = disabled;

  button.addEventListener("click", onClick);

  return button;
}



// 2. CARD COMPONENT


function createCard({
  title,
  description,
  image,
  buttonText = "Learn More",
  buttonVariant = "primary",
  onButtonClick = () => {},
}) {
  const card = document.createElement("article");

  card.className = "ui-card";

  // Card image
  if (image) {
    const img = document.createElement("img");

    img.src = image;
    img.alt = title;
    img.className = "card-image";

    card.appendChild(img);
  }

  // Card content
  const content = document.createElement("div");

  content.className = "card-content";

  // Title
  const heading = document.createElement("h3");

  heading.textContent = title;
  heading.className = "card-title";

  // Description
  const paragraph = document.createElement("p");

  paragraph.textContent = description;
  paragraph.className = "card-description";

  // Reuse our Button component
  const button = createButton({
    text: buttonText,
    variant: buttonVariant,
    onClick: onButtonClick,
  });

  content.append(heading, paragraph, button);

  card.appendChild(content);

  return card;
}



// 3. MODAL COMPONENT


function createModal({
  title = "Modal",
  content = "",
  closeOnOverlay = true,
}) {
  const overlay = document.createElement("div");

  overlay.className = "modal-overlay";

  const modal = document.createElement("div");

  modal.className = "modal-box";

  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");

  // Modal title
  const heading = document.createElement("h2");

  heading.textContent = title;
  heading.className = "modal-title";

  // Modal content
  const contentElement = document.createElement("div");

  contentElement.className = "modal-content";

  if (content instanceof HTMLElement) {
    contentElement.appendChild(content);
  } else {
    contentElement.textContent = content;
  }

  // Close button
  const closeButton = document.createElement("button");

  closeButton.type = "button";
  closeButton.className = "modal-close";
  closeButton.innerHTML = "&times;";
  closeButton.setAttribute("aria-label", "Close modal");

  modal.append(
    closeButton,
    heading,
    contentElement
  );

  overlay.appendChild(modal);


  // Close function
  function closeModal() {
    overlay.remove();

    document.body.classList.remove("modal-open");

    document.removeEventListener(
      "keydown",
      handleEscape
    );
  }


  // Escape key support
  function handleEscape(event) {
    if (event.key === "Escape") {
      closeModal();
    }
  }


  // Close button
  closeButton.addEventListener(
    "click",
    closeModal
  );


  // Close when clicking outside modal
  if (closeOnOverlay) {
    overlay.addEventListener(
      "click",
      (event) => {
        if (event.target === overlay) {
          closeModal();
        }
      }
    );
  }


  // Open modal
  function openModal() {
    document.body.appendChild(overlay);

    document.body.classList.add(
      "modal-open"
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    closeButton.focus();
  }


  return {
    open: openModal,
    close: closeModal,
    element: overlay,
  };
}



// 4. TOAST COMPONENT


function showToast({
  message,
  type = "info",
  duration = 3000,
}) {
  const toastContainer =
    document.getElementById(
      "toast-container"
    );

  const toast =
    document.createElement("div");

  toast.className =
    `toast toast-${type}`;

  // Icons for different toast types
  const icons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  };


  const icon =
    document.createElement("span");

  icon.className = "toast-icon";
  icon.textContent =
    icons[type] || icons.info;


  const messageElement =
    document.createElement("p");

  messageElement.className =
    "toast-message";

  messageElement.textContent =
    message;


  const closeButton =
    document.createElement("button");

  closeButton.className =
    "toast-close";

  closeButton.innerHTML = "&times;";

  closeButton.setAttribute(
    "aria-label",
    "Close notification"
  );


  toast.append(
    icon,
    messageElement,
    closeButton
  );


  // Add toast to container
  // Multiple toasts automatically stack
  toastContainer.appendChild(toast);


  let isRemoved = false;


  function removeToast() {
    if (isRemoved) return;

    isRemoved = true;

    toast.classList.add("toast-out");

    setTimeout(() => {
      toast.remove();
    }, 250);
  }


  // Manual close
  closeButton.addEventListener(
    "click",
    removeToast
  );


  // Auto dismiss
  const timer =
    setTimeout(
      removeToast,
      duration
    );


  // Stop timer if manually removed
  toast.addEventListener(
    "transitionend",
    () => {
      if (!document.body.contains(toast)) {
        clearTimeout(timer);
      }
    }
  );


  return {
    element: toast,
    close: removeToast,
  };
}



// DEMO PAGE
// Button Demo


const buttonDemo =
  document.getElementById(
    "button-demo"
  );


const primaryButton =
  createButton({
    text: "Primary Button",
    variant: "primary",

    onClick: () => {
      showToast({
        message:
          "Primary button clicked!",
        type: "info",
      });
    },
  });


const successButton =
  createButton({
    text: "Save Changes",
    variant: "success",

    onClick: () => {
      showToast({
        message:
          "Changes saved successfully!",
        type: "success",
      });
    },
  });


const dangerButton =
  createButton({
    text: "Delete",
    variant: "danger",

    onClick: () => {
      showToast({
        message:
          "Delete button clicked.",
        type: "error",
      });
    },
  });


const outlineButton =
  createButton({
    text: "Outline Button",
    variant: "outline",

    onClick: () => {
      showToast({
        message:
          "Outline button clicked.",
        type: "info",
      });
    },
  });


const disabledButton =
  createButton({
    text: "Disabled",
    variant: "secondary",
    disabled: true,
  });


buttonDemo.append(
  primaryButton,
  successButton,
  dangerButton,
  outlineButton,
  disabledButton
);



// Card Demo


const cardDemo =
  document.getElementById(
    "card-demo"
  );


const cardData = [
  {
    title: "Web Development",

    description:
      "Learn modern frontend development and build responsive web applications.",

    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",

    buttonText: "Explore",

    buttonVariant: "primary",
  },

  {
    title: "UI Design",

    description:
      "Create clean, accessible, and user-friendly interfaces for modern products.",

    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",

    buttonText: "View Design",

    buttonVariant: "outline",
  },

  {
    title: "JavaScript",

    description:
      "Use JavaScript to create dynamic and interactive experiences for the web.",

    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",

    buttonText: "Start Learning",

    buttonVariant: "success",
  },
];


cardData.forEach((data) => {
  const card =
    createCard({
      ...data,

      onButtonClick: () => {
        showToast({
          message:
            `${data.title} selected!`,

          type: "success",
        });
      },
    });

  cardDemo.appendChild(card);
});



// Modal Demo


const modalDemo =
  document.getElementById(
    "modal-demo"
  );


const infoModal =
  createModal({
    title: "About This UI Kit",

    content:
      "This modal was created using a reusable JavaScript function. The title and content are passed as parameters.",
  });


const confirmationContent =
  document.createElement("div");

confirmationContent.innerHTML = `
  <p>
    Are you sure you want to continue?
  </p>
`;

const confirmButtonContainer =
  document.createElement("div");

confirmButtonContainer.style.marginTop =
  "20px";

confirmButtonContainer.style.display =
  "flex";

confirmButtonContainer.style.gap =
  "10px";


const confirmButton =
  createButton({
    text: "Confirm",
    variant: "success",

    onClick: () => {
      confirmationModal.close();

      showToast({
        message:
          "Action confirmed successfully!",
        type: "success",
      });
    },
  });


const cancelButton =
  createButton({
    text: "Cancel",
    variant: "secondary",

    onClick: () => {
      confirmationModal.close();
    },
  });


confirmButtonContainer.append(
  confirmButton,
  cancelButton
);


confirmationContent.appendChild(
  confirmButtonContainer
);


const confirmationModal =
  createModal({
    title: "Confirm Action",

    content: confirmationContent,
  });


const openInfoModal =
  createButton({
    text: "Open Info Modal",
    variant: "primary",

    onClick: () => {
      infoModal.open();
    },
  });


const openConfirmationModal =
  createButton({
    text: "Open Confirmation Modal",
    variant: "outline",

    onClick: () => {
      confirmationModal.open();
    },
  });


modalDemo.append(
  openInfoModal,
  openConfirmationModal
);


// Toast Demo


const toastDemo =
  document.getElementById(
    "toast-demo"
  );


const toastButtons = [
  {
    text: "Success Toast",
    variant: "success",
    type: "success",
    message:
      "Operation completed successfully!",
  },

  {
    text: "Error Toast",
    variant: "danger",
    type: "error",
    message:
      "Something went wrong!",
  },

  {
    text: "Warning Toast",
    variant: "secondary",
    type: "warning",
    message:
      "Please check your information.",
  },

  {
    text: "Info Toast",
    variant: "primary",
    type: "info",
    message:
      "Here is some useful information.",
  },
];


toastButtons.forEach(
  ({
    text,
    variant,
    type,
    message,
  }) => {
    const button =
      createButton({
        text,
        variant,

        onClick: () => {
          showToast({
            message,
            type,
            duration: 3000,
          });
        },
      });

    toastDemo.appendChild(button);
  }
);


// Create multiple toasts together
const stackToastButton =
  createButton({
    text: "Stack Multiple Toasts",
    variant: "outline",

    onClick: () => {
      showToast({
        message:
          "First notification",
        type: "info",
        duration: 4000,
      });

      showToast({
        message:
          "Second notification",
        type: "success",
        duration: 4500,
      });

      showToast({
        message:
          "Third notification",
        type: "warning",
        duration: 5000,
      });
    },
  });


toastDemo.appendChild(
  stackToastButton
);