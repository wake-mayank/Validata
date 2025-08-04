class SmartFormValidator {
  constructor() {
    // Get form and form elements
    this.form = document.getElementById("registrationForm")
    this.submitBtn = document.getElementById("submitBtn")
    this.successMessage = document.getElementById("successMessage")

    // Form fields
    this.fields = {
      fullName: document.getElementById("fullName"),
      email: document.getElementById("email"),
      phone: document.getElementById("phone"),
      password: document.getElementById("password"),
      confirmPassword: document.getElementById("confirmPassword"),
      terms: document.getElementById("terms"),
    }

    // Error message elements
    this.errorElements = {
      fullName: document.getElementById("fullNameError"),
      email: document.getElementById("emailError"),
      phone: document.getElementById("phoneError"),
      password: document.getElementById("passwordError"),
      confirmPassword: document.getElementById("confirmPasswordError"),
      terms: document.getElementById("termsError"),
    }

    // Password strength elements
    this.strengthIndicator = document.querySelector(".password-strength")
    this.strengthFill = document.getElementById("strengthFill")
    this.strengthText = document.getElementById("strengthText")

    // Validation state
    this.validationState = {
      fullName: false,
      email: false,
      phone: false,
      password: false,
      confirmPassword: false,
      terms: false,
    }

    // Initialize the form validator
    this.init()
  }

  /**
   * Initialize all event listeners and setup
   */
  init() {
    console.log("🚀 Smart Form Validator initialized!")

    // Add form submission event listener
    this.form.addEventListener("submit", (e) => this.handleFormSubmit(e))

    // Add real-time validation for each field
    this.setupFieldValidation()

    // Setup password visibility toggles
    this.setupPasswordToggles()

    // Add form animation
    this.form.classList.add("fade-in")

    console.log("✅ All event listeners attached successfully!")
  }

  /**
   * Setup real-time validation for all form fields
   */
  setupFieldValidation() {
    // Full Name validation
    this.fields.fullName.addEventListener("input", () => {
      this.validateFullName()
    })

    this.fields.fullName.addEventListener("blur", () => {
      this.validateFullName()
    })

    // Email validation
    this.fields.email.addEventListener("input", () => {
      this.validateEmail()
    })

    this.fields.email.addEventListener("blur", () => {
      this.validateEmail()
    })

    // Phone validation
    this.fields.phone.addEventListener("input", () => {
      // Only allow numbers
      this.fields.phone.value = this.fields.phone.value.replace(/\D/g, "")
      this.validatePhone()
    })

    this.fields.phone.addEventListener("blur", () => {
      this.validatePhone()
    })

    // Password validation
    this.fields.password.addEventListener("input", () => {
      this.validatePassword()
      this.updatePasswordStrength()
      // Re-validate confirm password if it has content
      if (this.fields.confirmPassword.value) {
        this.validateConfirmPassword()
      }
    })

    this.fields.password.addEventListener("blur", () => {
      this.validatePassword()
    })

    // Confirm Password validation
    this.fields.confirmPassword.addEventListener("input", () => {
      this.validateConfirmPassword()
    })

    this.fields.confirmPassword.addEventListener("blur", () => {
      this.validateConfirmPassword()
    })

    // Terms checkbox validation
    this.fields.terms.addEventListener("change", () => {
      this.validateTerms()
    })
  }

  /**
   * Setup password visibility toggle functionality
   */
  setupPasswordToggles() {
    const passwordToggle = document.getElementById("passwordToggle")
    const confirmPasswordToggle = document.getElementById("confirmPasswordToggle")

    // Password field toggle
    passwordToggle.addEventListener("click", () => {
      this.togglePasswordVisibility(this.fields.password, passwordToggle)
    })

    // Confirm password field toggle
    confirmPasswordToggle.addEventListener("click", () => {
      this.togglePasswordVisibility(this.fields.confirmPassword, confirmPasswordToggle)
    })
  }

  /**
   * Toggle password visibility
   * @param {HTMLElement} field - Password input field
   * @param {HTMLElement} toggle - Toggle button element
   */
  togglePasswordVisibility(field, toggle) {
    const icon = toggle.querySelector("i")

    if (field.type === "password") {
      field.type = "text"
      icon.classList.remove("fa-eye")
      icon.classList.add("fa-eye-slash")
    } else {
      field.type = "password"
      icon.classList.remove("fa-eye-slash")
      icon.classList.add("fa-eye")
    }
  }

  /**
   * Validate full name field
   * Rules: Must be at least 5 characters long
   */
  validateFullName() {
    const fullName = this.fields.fullName.value.trim()
    const field = this.fields.fullName
    const errorElement = this.errorElements.fullName

    // Clear previous validation
    this.clearFieldValidation(field)

    if (fullName === "") {
      this.setFieldError(field, errorElement, "Full name is required")
      this.validationState.fullName = false
      return false
    }

    if (fullName.length < 5) {
      this.setFieldError(field, errorElement, "Full name must be at least 5 characters long")
      this.validationState.fullName = false
      return false
    }

    // Check if name contains only letters and spaces
    const nameRegex = /^[a-zA-Z\s]+$/
    if (!nameRegex.test(fullName)) {
      this.setFieldError(field, errorElement, "Full name can only contain letters and spaces")
      this.validationState.fullName = false
      return false
    }

    this.setFieldSuccess(field)
    this.validationState.fullName = true
    return true
  }

  /**
   * Validate email field
   * Rules: Must contain '@' symbol and be a valid email format
   */
  validateEmail() {
    const email = this.fields.email.value.trim()
    const field = this.fields.email
    const errorElement = this.errorElements.email

    // Clear previous validation
    this.clearFieldValidation(field)

    if (email === "") {
      this.setFieldError(field, errorElement, "Email address is required")
      this.validationState.email = false
      return false
    }

    // Check if email contains '@' symbol
    if (!email.includes("@")) {
      this.setFieldError(field, errorElement, "Email must contain @ symbol")
      this.validationState.email = false
      return false
    }

    // Validate email format using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      this.setFieldError(field, errorElement, "Please enter a valid email address")
      this.validationState.email = false
      return false
    }

    this.setFieldSuccess(field)
    this.validationState.email = true
    return true
  }

  /**
   * Validate phone number field
   * Rules: Must be exactly 10 digits and not '1234567890'
   */
  validatePhone() {
    const phone = this.fields.phone.value.trim()
    const field = this.fields.phone
    const errorElement = this.errorElements.phone

    // Clear previous validation
    this.clearFieldValidation(field)

    if (phone === "") {
      this.setFieldError(field, errorElement, "Phone number is required")
      this.validationState.phone = false
      return false
    }

    // Check if phone number is exactly 10 digits
    if (phone.length !== 10) {
      this.setFieldError(field, errorElement, "Phone number must be exactly 10 digits")
      this.validationState.phone = false
      return false
    }

    // Check if phone number is not the forbidden sequence
    if (phone === "1234567890") {
      this.setFieldError(field, errorElement, "Please enter a valid phone number (not 1234567890)")
      this.validationState.phone = false
      return false
    }

    // Check if all digits are the same (like 1111111111)
    if (/^(\d)\1{9}$/.test(phone)) {
      this.setFieldError(field, errorElement, "Please enter a valid phone number")
      this.validationState.phone = false
      return false
    }

    this.setFieldSuccess(field)
    this.validationState.phone = true
    return true
  }

  /**
   * Validate password field
   * Rules: At least 8 characters, not 'password' or user's name
   */
  validatePassword() {
    const password = this.fields.password.value
    const fullName = this.fields.fullName.value.trim().toLowerCase()
    const field = this.fields.password
    const errorElement = this.errorElements.password

    // Clear previous validation
    this.clearFieldValidation(field)

    if (password === "") {
      this.setFieldError(field, errorElement, "Password is required")
      this.validationState.password = false
      return false
    }

    // Check minimum length
    if (password.length < 8) {
      this.setFieldError(field, errorElement, "Password must be at least 8 characters long")
      this.validationState.password = false
      return false
    }

    // Check if password is 'password'
    if (password.toLowerCase() === "password") {
      this.setFieldError(field, errorElement, 'Password cannot be "password"')
      this.validationState.password = false
      return false
    }

    // Check if password contains user's name
    if (fullName && password.toLowerCase().includes(fullName)) {
      this.setFieldError(field, errorElement, "Password cannot contain your name")
      this.validationState.password = false
      return false
    }

    // Check for common weak passwords
    const weakPasswords = ["12345678", "qwerty123", "abc12345", "password123"]
    if (weakPasswords.includes(password.toLowerCase())) {
      this.setFieldError(field, errorElement, "Please choose a stronger password")
      this.validationState.password = false
      return false
    }

    this.setFieldSuccess(field)
    this.validationState.password = true
    return true
  }

  /**
   * Validate confirm password field
   * Rules: Must match the original password exactly
   */
  validateConfirmPassword() {
    const password = this.fields.password.value
    const confirmPassword = this.fields.confirmPassword.value
    const field = this.fields.confirmPassword
    const errorElement = this.errorElements.confirmPassword

    // Clear previous validation
    this.clearFieldValidation(field)

    if (confirmPassword === "") {
      this.setFieldError(field, errorElement, "Please confirm your password")
      this.validationState.confirmPassword = false
      return false
    }

    if (password !== confirmPassword) {
      this.setFieldError(field, errorElement, "Passwords do not match")
      this.validationState.confirmPassword = false
      return false
    }

    this.setFieldSuccess(field)
    this.validationState.confirmPassword = true
    return true
  }

  /**
   * Validate terms and conditions checkbox
   */
  validateTerms() {
    const terms = this.fields.terms.checked
    const field = this.fields.terms
    const errorElement = this.errorElements.terms

    if (!terms) {
      this.setFieldError(field, errorElement, "You must agree to the terms and conditions")
      this.validationState.terms = false
      return false
    }

    this.clearFieldValidation(field)
    this.validationState.terms = true
    return true
  }

  /**
   * Update password strength indicator
   */
  updatePasswordStrength() {
    const password = this.fields.password.value
    let strength = 0
    let strengthText = "Very Weak"
    let strengthClass = ""

    if (password.length === 0) {
      this.strengthIndicator.className = "password-strength"
      this.strengthText.textContent = "Password Strength"
      return
    }

    // Length check
    if (password.length >= 8) strength += 1
    if (password.length >= 12) strength += 1

    // Character variety checks
    if (/[a-z]/.test(password)) strength += 1 // lowercase
    if (/[A-Z]/.test(password)) strength += 1 // uppercase
    if (/[0-9]/.test(password)) strength += 1 // numbers
    if (/[^A-Za-z0-9]/.test(password)) strength += 1 // special characters

    // Determine strength level
    if (strength <= 2) {
      strengthText = "Weak"
      strengthClass = "strength-weak"
    } else if (strength <= 3) {
      strengthText = "Fair"
      strengthClass = "strength-fair"
    } else if (strength <= 4) {
      strengthText = "Good"
      strengthClass = "strength-good"
    } else {
      strengthText = "Strong"
      strengthClass = "strength-strong"
    }

    // Update UI
    this.strengthIndicator.className = `password-strength ${strengthClass}`
    this.strengthText.textContent = strengthText
  }

  /**
   * Set field error state and message
   * @param {HTMLElement} field - Input field element
   * @param {HTMLElement} errorElement - Error message element
   * @param {string} message - Error message
   */
  setFieldError(field, errorElement, message) {
    field.classList.remove("is-valid")
    field.classList.add("is-invalid")
    errorElement.textContent = message
    errorElement.style.display = "block"

    // Add shake animation
    field.classList.add("shake")
    setTimeout(() => {
      field.classList.remove("shake")
    }, 500)
  }

  /**
   * Set field success state
   * @param {HTMLElement} field - Input field element
   */
  setFieldSuccess(field) {
    field.classList.remove("is-invalid")
    field.classList.add("is-valid")
  }

  /**
   * Clear field validation state
   * @param {HTMLElement} field - Input field element
   */
  clearFieldValidation(field) {
    field.classList.remove("is-valid", "is-invalid")
    const errorElement = field.parentNode.parentNode.querySelector(".invalid-feedback")
    if (errorElement) {
      errorElement.style.display = "none"
    }
  }

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  handleFormSubmit(e) {
    e.preventDefault()

    console.log("📝 Form submission attempted...")

    // Validate all fields
    const isFullNameValid = this.validateFullName()
    const isEmailValid = this.validateEmail()
    const isPhoneValid = this.validatePhone()
    const isPasswordValid = this.validatePassword()
    const isConfirmPasswordValid = this.validateConfirmPassword()
    const isTermsValid = this.validateTerms()

    // Check if all validations pass
    const isFormValid =
      isFullNameValid && isEmailValid && isPhoneValid && isPasswordValid && isConfirmPasswordValid && isTermsValid

    if (isFormValid) {
      this.submitForm()
    } else {
      this.handleFormErrors()
    }
  }

  /**
   * Submit the form (simulate form submission)
   */
  submitForm() {
    console.log("✅ Form is valid! Submitting...")

    // Show loading state
    this.setSubmitButtonLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      // Hide loading state
      this.setSubmitButtonLoading(false)

      // Show success message
      this.showSuccessMessage()

      // Log form data (in real app, this would be sent to server)
      this.logFormData()

      // Reset form after successful submission
      setTimeout(() => {
        this.resetForm()
      }, 3000)
    }, 2000)
  }

  /**
   * Handle form validation errors
   */
  handleFormErrors() {
    console.log("❌ Form has validation errors")

    // Find first invalid field and focus it
    const firstInvalidField = this.form.querySelector(".is-invalid")
    if (firstInvalidField) {
      firstInvalidField.focus()
      firstInvalidField.scrollIntoView({ behavior: "smooth", block: "center" })
    }

    // Shake the submit button
    this.submitBtn.classList.add("shake")
    setTimeout(() => {
      this.submitBtn.classList.remove("shake")
    }, 500)
  }

  /**
   * Set submit button loading state
   * @param {boolean} isLoading - Loading state
   */
  setSubmitButtonLoading(isLoading) {
    const btnText = this.submitBtn.querySelector(".btn-text")
    const btnLoading = this.submitBtn.querySelector(".btn-loading")

    if (isLoading) {
      btnText.classList.add("d-none")
      btnLoading.classList.remove("d-none")
      this.submitBtn.disabled = true
    } else {
      btnText.classList.remove("d-none")
      btnLoading.classList.add("d-none")
      this.submitBtn.disabled = false
    }
  }

  /**
   * Show success message
   */
  showSuccessMessage() {
    this.successMessage.classList.remove("d-none")
    this.successMessage.classList.add("fade-in")
    this.successMessage.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  /**
   * Log form data (for demonstration purposes)
   */
  logFormData() {
    const formData = {
      fullName: this.fields.fullName.value,
      email: this.fields.email.value,
      phone: this.fields.phone.value,
      password: "***hidden***", // Never log actual passwords
      termsAccepted: this.fields.terms.checked,
      submittedAt: new Date().toISOString(),
    }

    console.log("📊 Form Data:", formData)
  }

  /**
   * Reset form to initial state
   */
  resetForm() {
    // Reset form fields
    this.form.reset()

    // Clear all validation states
    Object.keys(this.fields).forEach((fieldName) => {
      this.clearFieldValidation(this.fields[fieldName])
    })

    // Reset validation state
    Object.keys(this.validationState).forEach((key) => {
      this.validationState[key] = false
    })

    // Reset password strength indicator
    this.strengthIndicator.className = "password-strength"
    this.strengthText.textContent = "Password Strength"

    // Hide success message
    this.successMessage.classList.add("d-none")

    console.log("🔄 Form reset successfully")
  }
}

// Initialize the form validator when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Create new instance of SmartFormValidator
  const formValidator = new SmartFormValidator()

  // Add some console styling for better debugging
  console.log("%c🚀 Smart Form Validator Project", "color: #6366f1; font-size: 16px; font-weight: bold;")
  console.log("%c📋 Features:", "color: #10b981; font-weight: bold;")
  console.log("   ✅ Real-time validation")
  console.log("   ✅ Password strength indicator")
  console.log("   ✅ Form submission handling")
  console.log("   ✅ Error message display")
  console.log("   ✅ Responsive design")
  console.log("   ✅ Accessibility features")

  console.log("%c🛠️ Technologies:", "color: #f59e0b; font-weight: bold;")
  console.log("   • HTML5")
  console.log("   • CSS3 + Bootstrap 5")
  console.log("   • Vanilla JavaScript")

  // Add keyboard shortcuts for development
  document.addEventListener("keydown", (e) => {
    // Ctrl + R to reset form (for development)
    if (e.ctrlKey && e.key === "r") {
      e.preventDefault()
      formValidator.resetForm()
      console.log("🔄 Form reset via keyboard shortcut")
    }
  })
})

// Add some utility functions for enhanced functionality
const FormUtils = {
  /**
   * Generate a random strong password
   * @param {number} length - Password length
   * @returns {string} - Generated password
   */
  generateStrongPassword(length = 12) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
    let password = ""
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    return password
  },

  /**
   * Check if password has been compromised (mock function)
   * @param {string} password - Password to check
   * @returns {boolean} - Whether password is compromised
   */
  isPasswordCompromised(password) {
    // In a real application, this would check against a database of compromised passwords
    const commonPasswords = [
      "password",
      "123456",
      "password123",
      "admin",
      "qwerty",
      "letmein",
      "welcome",
      "monkey",
      "1234567890",
    ]
    return commonPasswords.includes(password.toLowerCase())
  },

  /**
   * Format phone number for display
   * @param {string} phone - Raw phone number
   * @returns {string} - Formatted phone number
   */
  formatPhoneNumber(phone) {
    if (phone.length === 10) {
      return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`
    }
    return phone
  },
}

// Export for potential module use
if (typeof module !== "undefined" && module.exports) {
  module.exports = { SmartFormValidator, FormUtils }
}
