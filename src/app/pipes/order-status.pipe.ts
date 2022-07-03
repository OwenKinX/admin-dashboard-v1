import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {

  transform(value: 'Y'|'P'|'N'| null, ...args: unknown[]): unknown {
    switch (value) {
      case 'Y':
        return 'ອະນຸມັດ'
      case 'P':
        return 'ລໍຖ້າການອະນຸມັດ'
      case 'N':
        return 'ບໍ່ອະນຸມັດ'
      default:
        break;
    }
  }

}
