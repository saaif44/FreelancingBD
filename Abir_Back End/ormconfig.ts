
import { GigManagement } from "src/gig-management/entities/gig-management.entity";
import { PrivacySetting } from "src/privacy-settings/entities/privacy-setting.entity";
import { ReviewRating } from "src/review-rating/entities/review-rating.entity";
import { User } from "src/user/entities/user.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  entities: [User, GigManagement, ReviewRating, PrivacySetting],
  synchronize: true,
  logging: true,
  schema: 'public',
};

export default ormConfig;