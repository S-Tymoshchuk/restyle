import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'review_answers', timestamps: false })
export class ReviewAnswersEntities extends Model {
  @Column
  name: string;
}
