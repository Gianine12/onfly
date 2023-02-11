import { Document } from "mongoose";
import { Usuario } from "src/usuario/interface/usuario.interface";

export interface Despesa extends Document{
  descricacao: string,
  data: Date,
  valor: number,
  usuario: Usuario
}

// descricacao: { type: String},
// data: { type: Date},
// valor: {type: Number},
// usuario:[{
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "Usuario"
// }]