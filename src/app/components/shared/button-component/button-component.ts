import { Component, input, output } from '@angular/core';
import { NButtonSize, NButtonType } from '../../../interfaces';

@Component({
  selector: 'app-button-component',
  imports: [],
  templateUrl: './button-component.html',
  styleUrl: './button-component.scss',
})
export class ButtonComponent {
  public readonly title = input.required<string>();
  public readonly disabled = input<boolean | null>(null);
  public readonly type = input<NButtonType>('accent');
  public readonly size = input<NButtonSize>('default');
  public readonly buttonClick = output<void>();
}
