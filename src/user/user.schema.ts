import { Schema } from 'dynamoose';

export const UserSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  name: {
    type: String,
    index: {
      name: 'nameIndex',
    },
  },
  email: {
    type: String,
    index: {
      name: 'emailIndex',
    },
  },
  phone: {
    type: Number,
  },
});
