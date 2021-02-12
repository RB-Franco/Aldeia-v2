export class Autenticacao {

    //Método para conexão local, e não núvem, para obter um token para logar.
    public static ObtenhaToken(chave: string): string {
        return localStorage.getItem[chave];
    }

    public static EstaAutenticado(): boolean {
        return (localStorage.getItem("autenticado") === "S");
    }

    public static ObtenhaUsuarioLogado() {
        return localStorage.getItem("usuariologado");
    }

    public static SalvarDados(chave:string,valor:any){
        localStorage.setItem(chave,valor);
    }

    public static ObtenhaDado(chave: string) {
        return localStorage.getItem(chave);
    }

    public static LimparSessao(){
        localStorage.clear();
    }
}