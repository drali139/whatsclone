import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textEllipsis',
  standalone: true
})
export class TextEllipsisPipe implements PipeTransform {
  transform(value: string, limit: number = 70): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    return value.substring(0, limit) + '...';
  }
}