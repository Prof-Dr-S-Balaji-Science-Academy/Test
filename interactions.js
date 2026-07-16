/* ================================================================
   PROF. BALAJI DESIGN SYSTEM - INTERACTIONS JS
   Form handling, navigation, modal, and UI interactions
   ================================================================ */

// ==================== HAMBURGER MENU ====================

class HamburgerMenu {
  constructor() {
    this.hamburger = document.querySelector('.hamburger');
    this.nav = document.querySelector('header nav');
    if (!this.hamburger) return;
    
    this.init();
  }

  init() {
    this.hamburger.addEventListener('click', () => {
      this.nav.classList.toggle('active');
      this.hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    this.nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        this.nav.classList.remove('active');
        this.hamburger.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('header')) {
        this.nav.classList.remove('active');
        this.hamburger.classList.remove('active');
      }
    });
  }
}

// ==================== FORM VALIDATION ====================

class FormValidator {
  constructor(formSelector) {
    this.form = document.querySelector(formSelector);
    if (!this.form) return;
    
    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (this.validateForm()) {
        this.handleSuccess();
      }
    });

    // Real-time validation
    this.form.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('blur', () => {
        this.validateField(field);
      });
    });
  }

  validateForm() {
    let isValid = true;
    const fields = this.form.querySelectorAll('input, textarea');

    fields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let errorMessage = '';

    // Remove previous error state
    field.classList.remove('error', 'success');
    const errorEl = field.parentElement.querySelector('.form-error');
    if (errorEl) {
      errorEl.remove();
    }

    // Validation rules
    if (!value) {
      isValid = false;
      errorMessage = 'This field is required';
    } else if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email';
      }
    } else if (type === 'password') {
      if (value.length < 8) {
        isValid = false;
        errorMessage = 'Password must be at least 8 characters';
      }
    } else if (field.name === 'confirm-password') {
      const password = this.form.querySelector('input[name="password"]')?.value;
      if (value !== password) {
        isValid = false;
        errorMessage = 'Passwords do not match';
      }
    }

    // Show error or success
    if (isValid) {
      field.classList.add('success');
    } else {
      field.classList.add('error');
      const error = document.createElement('div');
      error.className = 'form-error';
      error.textContent = errorMessage;
      field.parentElement.appendChild(error);
    }

    return isValid;
  }

  handleSuccess() {
    const successMessage = document.createElement('div');
    successMessage.className = 'notification success';
    successMessage.textContent = 'Form submitted successfully!';
    document.body.appendChild(successMessage);

    setTimeout(() => {
      successMessage.remove();
    }, 3000);
  }
}

// ==================== MODAL DIALOG ====================

class Modal {
  constructor(modalSelector) {
    this.modal = document.querySelector(modalSelector);
    if (!this.modal) return;
    
    this.init();
  }

  init() {
    // Close button
    const closeBtn = this.modal.querySelector('[data-close-modal]');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    // Click outside to close
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });
  }

  open() {
    this.modal.style.display = 'flex';
    this.modal.classList.add('fade-in');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.remove('fade-in');
    setTimeout(() => {
      this.modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 300);
  }

  isOpen() {
    return this.modal.style.display === 'flex';
  }
}

// ==================== TABS ====================

class Tabs {
  constructor(tabsSelector) {
    this.tabs = document.querySelectorAll(tabsSelector);
    if (this.tabs.length === 0) return;
    
    this.init();
  }

  init() {
    this.tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        this.activate(index);
      });
    });
  }

  activate(index) {
    // Remove active class from all tabs
    this.tabs.forEach(tab => tab.classList.remove('active'));

    // Add active class to selected tab
    this.tabs[index].classList.add('active');

    // Update corresponding content
    const tabContent = document.querySelectorAll('[data-tab-content]');
    tabContent.forEach(content => content.classList.remove('active'));
    if (tabContent[index]) {
      tabContent[index].classList.add('active');
    }
  }
}

// ==================== DROPDOWN ====================

class Dropdown {
  constructor(triggerSelector, menuSelector) {
    this.trigger = document.querySelector(triggerSelector);
    this.menu = document.querySelector(menuSelector);
    if (!this.trigger || !this.menu) return;
    
    this.init();
  }

  init() {
    this.trigger.addEventListener('click', () => {
      this.menu.classList.toggle('active');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest(this.trigger.parentElement)) {
        this.menu.classList.remove('active');
      }
    });

    // Close when clicking on menu item
    this.menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        this.menu.classList.remove('active');
      });
    });
  }
}

// ==================== TOOLTIP ====================

class Tooltip {
  constructor(selector) {
    this.elements = document.querySelectorAll(selector);
    this.init();
  }

  init() {
    this.elements.forEach(el => {
      const tooltipText = el.getAttribute('data-tooltip');
      if (!tooltipText) return;

      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = tooltipText;
      tooltip.style.position = 'absolute';
      tooltip.style.backgroundColor = 'var(--color-navy)';
      tooltip.style.color = 'white';
      tooltip.style.padding = '8px 12px';
      tooltip.style.borderRadius = 'var(--radius-md)';
      tooltip.style.fontSize = 'var(--size-small)';
      tooltip.style.zIndex = 'var(--z-tooltip)';
      tooltip.style.display = 'none';
      tooltip.style.whiteSpace = 'nowrap';

      el.addEventListener('mouseenter', () => {
        document.body.appendChild(tooltip);
        const rect = el.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        tooltip.style.display = 'block';
      });

      el.addEventListener('mouseleave', () => {
        tooltip.remove();
      });
    });
  }
}

// ==================== NOTIFICATION ====================

class Notification {
  constructor(message, type = 'info', duration = 3000) {
    this.message = message;
    this.type = type; // 'success', 'error', 'warning', 'info'
    this.duration = duration;
    this.create();
  }

  create() {
    const notification = document.createElement('div');
    notification.className = `notification notification-${this.type} fade-in`;
    notification.textContent = this.message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = 'var(--space-md)';
    notification.style.borderRadius = 'var(--radius-md)';
    notification.style.zIndex = 'var(--z-notification)';
    notification.style.minWidth = '300px';
    notification.style.boxShadow = 'var(--shadow-lg)';

    // Set colors based on type
    const colors = {
      success: { bg: '#d4edda', text: '#155724', border: '#c3e6cb' },
      error: { bg: '#f8d7da', text: '#721c24', border: '#f5c6cb' },
      warning: { bg: '#fff3cd', text: '#856404', border: '#ffeeba' },
      info: { bg: '#d1ecf1', text: '#0c5460', border: '#bee5eb' }
    };

    const color = colors[this.type] || colors.info;
    notification.style.backgroundColor = color.bg;
    notification.style.color = color.text;
    notification.style.border = `1px solid ${color.border}`;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => notification.remove(), 300);
    }, this.duration);
  }
}

// ==================== ACCORDION ====================

class Accordion {
  constructor(selector) {
    this.items = document.querySelectorAll(selector);
    this.init();
  }

  init() {
    this.items.forEach(item => {
      const trigger = item.querySelector('[data-accordion-trigger]');
      const content = item.querySelector('[data-accordion-content]');

      if (!trigger || !content) return;

      trigger.addEventListener('click', () => {
        const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';
        
        // Close other accordion items
        this.items.forEach(otherItem => {
          const otherContent = otherItem.querySelector('[data-accordion-content]');
          otherContent.style.maxHeight = '0px';
          otherContent.style.overflow = 'hidden';
          otherItem.querySelector('[data-accordion-trigger]').classList.remove('active');
        });

        // Toggle current item
        if (!isOpen) {
          content.style.maxHeight = content.scrollHeight + 'px';
          trigger.classList.add('active');
        } else {
          content.style.maxHeight = '0px';
          trigger.classList.remove('active');
        }
      });
    });
  }
}

// ==================== COPY TO CLIPBOARD ====================

class CopyToClipboard {
  constructor(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      el.addEventListener('click', () => {
        const text = el.getAttribute('data-copy') || el.textContent;
        navigator.clipboard.writeText(text).then(() => {
          const originalText = el.textContent;
          el.textContent = 'Copied!';
          setTimeout(() => {
            el.textContent = originalText;
          }, 2000);
        });
      });
    });
  }
}

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
  new HamburgerMenu();
  new CopyToClipboard('[data-copy-btn]');
});

// Export for global use
window.ui = {
  FormValidator,
  Modal,
  Tabs,
  Dropdown,
  Tooltip,
  Notification,
  Accordion,
  CopyToClipboard
};
