import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tranformCourse'
})
export class TranformCoursePipe implements PipeTransform {

  transform(value: unknown): string {
    if(value == "C1"){
      return "B-tech";
    }
    else if(value == "C2"){
      return "B-Com";
    }
    else if(value == "C3"){
      return "M-tech"
    }
    else if(value == "C4"){
      return "MSc";
    }
    else{
      return "";
    }
  }

}
