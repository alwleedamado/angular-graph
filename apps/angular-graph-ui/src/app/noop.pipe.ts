import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noop'
})
export class NoopPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
