interface SignupData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

  const signupForm = document.querySelector('form') as HTMLFormElement;
  const nameInput = document.querySelector('input[type="text"]') as HTMLInputElement;
  const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
  const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement;
  const passwordConfirmationInput = document.querySelector('#confirm-password') as HTMLInputElement;
  const errorMessageDiv = document.getElementById('error-message') as HTMLDivElement;

  const showError = (message: string) => {
    errorMessageDiv.textContent = message;
    errorMessageDiv.classList.remove('hidden');
  };

  const hideError = () => {
    errorMessageDiv.classList.add('hidden');
    errorMessageDiv.textContent = '';
  };

  const validateForm = (data: SignupData): boolean => {
    if (data.password !== data.password_confirmation) {
        console.log(data);

      showError('Password do not match');
      return false;
    }
    if (!data.name.trim()) {
      showError('Please enter your name');
      return false;
    }

    if (!data.email.trim()) {
      showError('Please enter your email');
      return false;
    }

    if (!data.email.includes('@') || !data.email.includes('.')) {
      showError('Please enter a valid email address');
      return false;
    }

    if (!data.password) {
      showError('Please enter a password');
      return false;
    }

    if (data.password.length < 6) {
      showError('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError();

    const signupData: SignupData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value,
      password_confirmation: passwordConfirmationInput.value
    };

    if (!validateForm(signupData)) {
      return;
    }

    try {

      const response = await fetch('https://utg-exhibition-emotion-tracker-app-main-pwmfd6.laravel.cloud/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData)
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }
      console.log(signupData);
      localStorage.setItem('user', JSON.stringify({
        name: signupData.name,
        email: signupData.email
      }));

      window.location.href = '/pages/login.html';
    } catch (error) {
      showError('Failed to create account. Please try again.');
      console.error('Signup error:', error);
    }
  });
