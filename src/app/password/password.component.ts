import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PasswordStrengthService } from '../service/password.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true
    }
  ]
})

export class PasswordComponent implements ControlValueAccessor {
  inputValue: string = '';
  strength: string[] = ['strength-empty', 'strength-empty', 'strength-empty'];
  passwordForm: FormGroup;

  constructor(private passwordStrengthService: PasswordStrengthService, private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      password: ['']
    });

    this.passwordForm.valueChanges.subscribe((value: { password: string }) => {
      this.inputValue = value.password;
      this.updateStrength();
      this.onChange(this.inputValue);
      this.onTouch();
    });
  }

  onChange: (value: string) => void = () => {};
  onTouch: () => void = () => {};

  writeValue(value: string): void {
    this.inputValue = value || '';
    this.passwordForm.setValue({ password: this.inputValue }, { emitEvent: false });
    this.updateStrength();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  updateStrength(): void {
    this.strength = this.passwordStrengthService.classifyPasswordStrength(this.inputValue);
  }
}
