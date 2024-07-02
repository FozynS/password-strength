const passwordRegex = (password: string):number => {
  
  const hasLetters = /[A-Za-z]/.test(password);
  const hasDigits = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return [hasLetters, hasDigits, hasSymbols].filter(Boolean).length;
}

export default passwordRegex;

;