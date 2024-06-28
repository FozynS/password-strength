import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class PasswordStrengthService {

  classifyPasswordStrength(password: string):string[] {
    const hasLetters = /[A-Za-z]/.test(password);
    const hasDigits = /[0-9]/.test(password);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const typesCount = [hasLetters, hasDigits, hasSymbols].filter(Boolean).length;

    if (password.length === 0) {
      return ['strength-empty', 'strength-empty', 'strength-empty'];
    } else if (password.length <= 8) {
      return ['strength-weak', 'strength-weak', 'strength-weak'];
    } else {
      switch (typesCount) {
        case 1:
          return ['strength-weak', 'strength-empty', 'strength-empty'];
        case 2:
          return ['strength-medium', 'strength-medium', 'strength-empty'];
        case 3:
          return ['strength-strong', 'strength-strong', 'strength-strong'];
        default: 
          return ['strength-empty', 'strength-empty', 'strength-empty'];
      }
    }
  }
}