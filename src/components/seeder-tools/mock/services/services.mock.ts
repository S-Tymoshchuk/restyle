import { ServicesTypeEnum } from '@components/seeder-tools/enums/services-type-enum';
import { ServicesInterface } from '@components/seeder-tools/mock/services/services.interface';

export const ServicesMock: ServicesInterface[] = [
  {
    name: 'Adjust length',
    type: ServicesTypeEnum.ALTERATIONS,
  },
  {
    name: 'Adjust sleeves',
    type: ServicesTypeEnum.ALTERATIONS,
  },
  {
    name: 'Adjust waistband',
    type: ServicesTypeEnum.ALTERATIONS,
  },
  {
    name: 'Adjust fitting (taper)',
    type: ServicesTypeEnum.ALTERATIONS,
  },
  { name: 'Re-hem', type: ServicesTypeEnum.REPAIRS },
  { name: 'Small hole or tear', type: ServicesTypeEnum.REPAIRS },
  { name: 'Repair large hole or tear', type: ServicesTypeEnum.REPAIRS },
  { name: 'Replace zip', type: ServicesTypeEnum.REPAIRS },
  { name: 'Replace side zip', type: ServicesTypeEnum.REPAIRS },
  { name: 'Replace button', type: ServicesTypeEnum.REPAIRS },
  { name: 'Repair lining', type: ServicesTypeEnum.REPAIRS },
  { name: 'Replace lining', type: ServicesTypeEnum.REPAIRS },
  { name: 'Large hole or tear', type: ServicesTypeEnum.REPAIRS },
  { name: 'Replace', type: ServicesTypeEnum.REPAIRS },
  { name: 'Bespoke & Redesigns', type: ServicesTypeEnum.BESPOKEANDREDESIGNS },
];
