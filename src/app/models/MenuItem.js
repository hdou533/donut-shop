import mongoose, { Schema, models, model } from "mongoose";



const MenuItemSchema = new Schema({
    name: { type: String },
    image: { type: String },
    description: { type: String },
    category: { type: mongoose.Types.ObjectId },
    price: { type: Number },
    

},{timestamps: true})


export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema)
