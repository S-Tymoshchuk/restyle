import { UserEntities } from '@components/users/entities/user.entities';
import { UserDbDto } from '@components/users/dto/user.dto';

export class CreateUserMapper {
  static CreateUserMapperResponse(userEntity: UserEntities): UserDbDto {
    return userEntity
      ? {
          id: userEntity.id,
          role: userEntity.role,
          email: userEntity.email,
          firstName: userEntity.firstName,
          lastName: userEntity.lastName,
          phone: userEntity.phone,
          credentialId: userEntity.credentialsId,
          isEmailConfirmed: userEntity.isEmailConfirmed,
          tailorId: userEntity.tailorId || null,
        }
      : {};
  }

  static AuthresponseUser(userEntity: UserEntities) {
    return userEntity
      ? {
          id: userEntity.id,
          role: userEntity.role,
        }
      : {};
  }
}

// const test = {
//   postCode: 'SE11AA',
//   clothingItem: [
//     {
//       clothingItemId: 1,
//       materialId: [2, 3],
//       service: [{ serviceTypeId: 1, serviceId: [2, 3] }],
//     },
//     {
//       clothingItemId: 2,
//       materialId: [2, 3],
//       service: [{ serviceTypeId: 1, serviceId: [2, 3] }],
//     },
//   ],
// };
//
// const filter = {
//   postCode: 'SE11AA',
//   clothingItem: [1, 2],
//   material: [1, 2],
//   serviceType: [1],
//   service: [2, 2],
// };
