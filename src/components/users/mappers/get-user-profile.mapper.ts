import { UserEntities } from '@components/users/entities/user.entities';
import { TailorEntities } from '@components/users/entities/tailor.entities';
import {
  GetProfileUserResponse,
  TailorProfileResponse,
} from '@components/users/dto/response/get-profile-user.response';

export class GetUserProfileMapper {
  private static getTailorMapper(
    tailor: TailorEntities,
  ): TailorProfileResponse | Record<string, unknown> {
    return tailor
      ? {
          id: tailor.id,
          businessName: tailor.businessName,
          address: tailor.address,
          status: tailor.status,
          paymentPlan: tailor.paymentPlan,
          tailorServices: tailor.tailorServices.map((el) => el.serviceType),
        }
      : {};
  }
  static getUserProfile(
    userEntity: UserEntities,
  ): GetProfileUserResponse | Record<string, unknown> {
    return userEntity
      ? {
          id: userEntity.id,
          role: userEntity.role,
          email: userEntity.email,
          firstName: userEntity.firstName,
          lastName: userEntity.lastName,
          phone: userEntity.phone,
          credentialId: userEntity.credentialsId,
          tailor:
            GetUserProfileMapper.getTailorMapper(userEntity.tailor) || null,
          images:
            userEntity.images.map((el) => ({
              type: el.type,
              link: el.link,
            })) || [],

          reviews: userEntity.tailor.reviews
            ? userEntity.tailor.reviews.map((el) => ({
                id: el.id,
                name: el.name,
                titleReview: el.titleReview,
                feedback: el.feedback,
                createdAt: el.createdAt,
                stars: el.stars,
                answers: el.reviewOptions.map((answer) => ({
                  id: answer.reviewAnswer.id,
                  name: answer.reviewAnswer.name,
                })),
              }))
            : [],
        }
      : {};
  }
}
