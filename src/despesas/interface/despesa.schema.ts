import mongoose from "mongoose";

export const DespesaSchema = new mongoose.Schema({
  descricacao: { type: String, range: 1},
  data: { type: Date},
  valor: {type: Number},
  usuario:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario"
  }
},{ timestamps: true, collection: 'despesa'})