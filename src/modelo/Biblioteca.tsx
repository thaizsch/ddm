// cadastro livro
//nomepessoa, nomelivro, autor, telbiblioteca

export class Biblioteca {
  
    constructor() {
}
   // constructor(id?: number, nome?: string, email?: string) {
   //   this.id = id;
   //   this.nome = nome;
   //   this.email = email;
   // }
   
   public id: number;
   public nomepessoa: string;    
   public nomelivro: string; 
   public autor: string; 
   public telbiblioteca: number;
   
   toString() {
     return this.id+''+this.nomepessoa+''+this.nomelivro+''+this.autor+''+this.telbiblioteca;
   }
 }