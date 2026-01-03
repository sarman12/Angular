import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortPipe'
})
export class SortPipePipe implements PipeTransform {

  transform(value: any[]): any[] {
    if (!value) return [];
    
    return value.sort((a, b) => {
      const nameA = a.fullname?.toLowerCase() || '';
      const nameB = b.fullname?.toLowerCase() || '';
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  }

}
