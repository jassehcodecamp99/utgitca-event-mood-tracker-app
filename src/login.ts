interface SignupData {
  email: string;
  password: string;
}

  const signupForm = document.querySelector('form') as HTMLFormElement;
  const nameInput = document.querySelector('input[type="text"]') as HTMLInputElement;
  const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
  const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement;
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
    // if (data.password !== data.password_confirmation) {
    //     console.log(data);

    //   showError('Password do not match');
    //   return false;
    // }


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
      email: emailInput.value.trim(),
      password: passwordInput.value,
    };

    if (!validateForm(signupData)) {
      return;
    }

    try {

      const response = await fetch('https://utg-exhibition-emotion-tracker-app-main-pwmfd6.laravel.cloud/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        redirect: 'error',
        body: JSON.stringify(signupData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('user', JSON.stringify({
        token: data.token,
        message: data.message,
        user: data?.user,
      }));

      window.location.href = '/pages/mood-logger.html';
    } catch (error) {
      showError('Failed to create account. Please try again.');
      console.error('Signup error:', error);
    }
  });
