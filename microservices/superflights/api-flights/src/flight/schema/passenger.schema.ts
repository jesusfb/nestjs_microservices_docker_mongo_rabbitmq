import * as mongoose from 'mongoose'

export const PassengerSchema = new mongoose.Schema({
  name: {
    type: String, require: true
  },
  email: {
    type: String, require: true
  },

}, { timestamps: true })


PassengerSchema.index({ name: 1}, { unique: true })