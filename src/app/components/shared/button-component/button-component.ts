import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button-component',
  imports: [],
  templateUrl: './button-component.html',
  styleUrl: './button-component.scss',
})
export class ButtonComponent {
  public readonly title = input.required<string>();
  public readonly disabled = input<boolean | null>(null);
  public readonly cssClass = input<string>();
  public readonly buttonClick = output<void>();
}
