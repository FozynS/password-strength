import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],  // исправлено на styleUrls
  standalone: true,
  imports: [CommonModule],
})
export class PasswordComponent {
  inputValue = '';
  firstSectionOfStrength = 'strength-empty';
  secondSectionOfStrength = 'strength-empty';
  thirdSectionOfStrength = 'strength-empty';

  classifyPasswordStrength(event: any) {
    this.inputValue = event.target.value;

    const hasLetters = /[A-Za-z]/.test(this.inputValue);
    const hasDigits = /[0-9]/.test(this.inputValue);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(this.inputValue);

    const typesCount = [hasLetters, hasDigits, hasSymbols].filter(Boolean).length;

    if (this.inputValue.length === 0) {
      this.firstSectionOfStrength = 'strength-empty';
      this.secondSectionOfStrength = 'strength-empty';
      this.thirdSectionOfStrength = 'strength-empty';
    } else if (this.inputValue.length <= 8) {
      this.firstSectionOfStrength = 'strength-weak';
      this.secondSectionOfStrength = 'strength-weak';
      this.thirdSectionOfStrength = 'strength-weak';
    } else {
      switch (typesCount) {
        case 1:
          this.firstSectionOfStrength = 'strength-weak';
          this.secondSectionOfStrength = 'strength-empty';
          this.thirdSectionOfStrength = 'strength-empty';
          break;
        case 2:
          this.firstSectionOfStrength = 'strength-medium';
          this.secondSectionOfStrength = 'strength-medium';
          this.thirdSectionOfStrength = 'strength-empty';
          break;
        case 3:
          this.firstSectionOfStrength = 'strength-strong';
          this.secondSectionOfStrength = 'strength-strong';
          this.thirdSectionOfStrength = 'strength-strong';
          break;
      }
    }
  }
}