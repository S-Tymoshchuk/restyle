import { UserImagesTypeEnum } from '@components/users/enums/user-images-type.enum';
import { UserRoles } from '@components/users/dto/user.dto';
import { ServicesTypeEntities } from '@components/seeder-tools/entities/service-type.entities';

export interface TailorProfileResponse {
  paymentPlan: string;
  address: string;
  businessName: string;
  id: string;
  tailorServices: ServicesTypeEntities[];
  status: boolean;
}

export interface GetProfileUserResponse {
  firstName: string;
  lastName: string;
  images: { link: string; type: UserImagesTypeEnum }[];
  role: UserRoles;
  phone: string;
  credentialId: number;
  tailor: TailorProfileResponse;
  id: string;
  email: string;
}
