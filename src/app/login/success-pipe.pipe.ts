import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'successPipe'
})
export class SuccessPipePipe implements PipeTransform {

  transform(value: unknown): unknown {
    return "Welcome, "+value;
  }

}
