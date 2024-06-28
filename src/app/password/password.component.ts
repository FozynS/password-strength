import { CommonModule } from "@angular/common";
import { Component, forwardRef } from "@angular/core";
import { PasswordStrengthService } from "./password.service";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrl: './password.component.css',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true,
    },
  ],
})

export class PasswordComponent implements ControlValueAccessor {
  inputValue = '';
  firstSectionOfStrength = 'strength-empty';
  secondSectionOfStrength = 'strength-empty';
  thirdSectionOfStrength = 'strength-empty';

  constructor(private passwordStrengthService: PasswordStrengthService) {}

  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue (value: any) {
    this.inputValue = value || '';
    this.updateStrength();
  }

  registerOnChange (fn: any): void {
    this.onChange = fn;
  }
  
  registerOnTouched (fn: any): void {
    this.onTouch = fn;
  }

  onInput(event: Event | any): void {
    this.inputValue = event.target.value;
    this.onChange(this.inputValue);
    this.onTouch();
    this.updateStrength();
  }

  updateStrength(): void {
    const strengths = this.passwordStrengthService.classifyPasswordStrength(this.inputValue);
    this.firstSectionOfStrength = strengths[0];
    this.secondSectionOfStrength = strengths[1];
    this.thirdSectionOfStrength = strengths[2];
  }
}