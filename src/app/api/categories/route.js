import { Category } from "@/app/models/Category"
import mongoose from "mongoose"


export async function POST(req) {
    mongoose.connect(process.env.DATABASE_ACCESS)
    const {name} = await req.json()
    
    const categoryDoc = await Category.create({ name })
    return Response.json(categoryDoc)

}

export async function PUT(req) {
    mongoose.connect(process.env.DATABASE_ACCESS)

    const { name, _id } = await req.json()
    
    console.log(_id)

    await Category.updateOne({_id}, {name})

    return Response.json(true)
}

export async function GET() {
    mongoose.connect(process.env.DATABASE_ACCESS)
    return Response.json(
        await Category.find()
    )
}

export async function DELETE(req) {
    mongoose.connect(process.env.DATABASE_ACCESS)
    const url = new URL(req.url)
    const _id = url.searchParams.get('_id')
    await Category.deleteOne({_id})
    return Response.json(true)


}
