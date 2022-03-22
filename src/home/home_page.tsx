import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import BibliotecaServico from '../servico/biblioteca_servico'
import Icon from 'react-native-vector-icons/Ionicons'
import { Biblioteca } from '../modelo/Biblioteca'


// métodos da home

export default class App extends React.Component {
  
constructor(props) {
    super(props);
    this.findAllBiblioteca() 
    }
    
    state = {
    biblioteca:Biblioteca,
    lista_array_dados_biblioteca: [],
    value: null, 
    Id_pesquisar:null, 
    onChangeText: null,
    formularioId: null,
    formularioNomepessoa:null,
    formularioNomelivro:null,
    formularioAutor:null,
    formularioTelbiblioteca:null
    }
    
    //acionado quando o componente e montado
    componentDidMount () {
    this.instanciarBiblioteca();
    this.findAllBiblioteca ();
    }
    
    //escuta atualizações na lista
    componentDidUpdate (prevProps, prevState) {
    if (prevState.lista_array_dados_biblioteca !== this.state.lista_array_dados_biblioteca) {
    this.findAllBiblioteca ();
    }
    }

    findAllBiblioteca=()=> {
        BibliotecaServico.findAll()
        .then((response: any) => {
        this.setState({
        lista_array_dados_biblioteca: response._array,
        isLoading: false,
        })
        }), (error) => {
        console.log(error);
        }
        }


    deleteBiblioteca=(id)=> {
    this.findBibliotecaById(id)
    if (this.state.formularioId != null || this.state.formularioId != undefined) {
        BibliotecaServico.deleteById(id)
    Alert.alert("biblioteca excluido com sucesso: ")
    }
    }
    
    atualizaBiblioteca=(item0, item1, item2,item3,item4)=> {
    let biblioteca=new Biblioteca()// cria objeto memória
    biblioteca.id=item0 // seta o atributo nome do objeto 
    biblioteca.nomepessoa=item1 // seta o atributo nome do objeto 
    biblioteca.nomelivro=item2 // seta o atributo nome do objeto 
    biblioteca.autor=item3 // seta o atributo nome do objeto  
    biblioteca.telbiblioteca=item4 // seta o atributo nome do objeto 
    // com o valor(state) do item
    
    BibliotecaServico.updateByObjeto(biblioteca).then((response: any) => {
    if (response._array.length >0 && response!= null && response!= undefined) {
    // popular o objeto da memória
    Alert.alert("Atualizado"); 
    
    } else {
    Alert.alert("Nome não encontrado")
    }
    }), (error) => {
    console.log(error);
    }
    }
    
    
    insertBiblioteca=(item1, item2,item3, item4)=> {
    let biblioteca=new Biblioteca()// cria objeto memória
    biblioteca.nomepessoa=item1 // seta o atributo nome do objeto 
    biblioteca.nomelivro=item2 // seta o atributo nome do objeto 
    biblioteca.autor=item3 // seta o atributo nome do objeto 
    biblioteca.telbiblioteca=item4 // seta o atributo nome do objeto 
    // com o valor(state) do item
    
    // cria um id no banco para persistir o objeto
    const insertId=BibliotecaServico.addData(biblioteca);
    // testa pra ver se deu certo a criação do id
    if(insertId==null || insertId==undefined){
    Alert.alert("Não foi possivel inserir o novo biblioteca")
    }
    return biblioteca
    }
    
    instanciarBiblioteca=()=>{
    let biblioteca:Biblioteca=new Biblioteca()// cria objeto memória
    return biblioteca
    }
    
    
    
    findBibliotecaById=(id)=> {
    BibliotecaServico.findById(id)
    .then((response: any) => {
    if (response._array.length >0 && response!= null && response!= undefined) {
    } else {
    Alert.alert("id não encontrado")
    }
    }), (error) => {
    console.log(error);
    }
    }
    
    localizaBiblioteca=(id)=> { 
    BibliotecaServico.findById(id)
    .then((response: any) => {
    if (response._array.length >0 && response!= null && response!= undefined) {
    let bibliotecapesquisa:Biblioteca=new Biblioteca()// cria objeto memória
    const bibliotecaretorno=response._array.map((item,key)=>{
    bibliotecapesquisa.id=item.id;
    bibliotecapesquisa.nomepessoa=item.nomepessoa;
    bibliotecapesquisa.nomelivro=item.nomelivro;
    bibliotecapesquisa.autor=item.autor;
    bibliotecapesquisa.telbiblioteca=item.telbiblioteca;
    
    })
    // o SetState abaixo mostra para o usuário o objeto recuperado do banco
    // e atualmente somente em memória 

    this.setState({
    biblioteca:bibliotecapesquisa,
    formularioId: bibliotecapesquisa.id,
    formularioNomepessoa:bibliotecapesquisa.nomepessoa,
    formularioNomelivro:bibliotecapesquisa.nomelivro,
    formularioAutor:bibliotecapesquisa.autor,
    formularioTelbiblioteca:bibliotecapesquisa.telbiblioteca,
    })
    // popular o objeto da memória
    //Alert.alert("Atualizado"); 
        } else {
    Alert.alert("Nome Não foi possível atualizar")
    }
    }), (error) => {
    console.log(error);
    }
    }


    // fim da parte de funções
    // agora é necessário passar os parametros para a visão através de renderização
    


    // aqui temos a renderização da tela (visão)
    render() {

        //extrai as propriedades entre chaves
        const {biblioteca,lista_array_dados_biblioteca,value,Id_pesquisar,formularioId,formularioNomepessoa,formularioNomelivro, formularioAutor, formularioTelbiblioteca} = this.state;
        // se tivermos animais listados oriundos do banco
        // a lista é mostrada na visão
        //const {animal}=animal;
        
        const bibliotecaList = lista_array_dados_biblioteca.map((item, key) => {
            return (
                <> 
                    <Text >id:{item.id} seu nome:{item.nomepessoa} nome do livro:{item.nomelivro} Autor:{item.autor} Telefone:{item.telbiblioteca}</Text>
                </>
            )
        })

        return (

            <View style={styles.container}>

                <Text style={{ fontSize: 20, paddingBottom: 20 }}>Crud de Bibliotecas</Text>

                <TextInput
                    placeholder="digite o id Pesquisar"
                    style={styles.textInput}
                    onChangeText={Id_pesquisar => { this.setState({ Id_pesquisar: Id_pesquisar }) }}
                    value={Id_pesquisar}
                />

                <Text>{formularioId}</Text>
                    
              
                <TextInput
                    placeholder="digite o seu nome"
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioNomepessoa => { this.setState({ formularioNomepessoa: formularioNomepessoa }) }}
                    value={formularioNomepessoa}
                />

                    <TextInput
                    placeholder="digite o nome do livro "
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioNomelivro => { this.setState({ formularioNomelivro: formularioNomelivro }) }}
                    value={formularioNomelivro}
                    
                />

                <TextInput
                    placeholder="digite o autor do livro "
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioAutor => { this.setState({ formularioAutor: formularioAutor }) }}
                    value={formularioAutor}
                    
                />

                 <TextInput
                    placeholder="digite o seu numero de telefone "
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioTelbiblioteca => { this.setState({ formularioTelbiblioteca: formularioTelbiblioteca }) }}
                    value={formularioTelbiblioteca}
                    
                />
               
                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() =>  {formularioNomepessoa == null  ? Alert.alert("O campo de nome não pode ser vazio") :this.insertBiblioteca(formularioNomepessoa, formularioNomelivro, formularioAutor, formularioTelbiblioteca)}} style={{ alignItems: "center", backgroundColor: 'green' }}>
                        <Icon name="md-add" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() =>  {formularioId == null  ? Alert.alert("Não tem Objeto para atualizar faça uma pesquisa") :this.atualizaBiblioteca(formularioId,formularioNomepessoa, formularioNomelivro, formularioAutor, formularioTelbiblioteca)}} style={{ alignItems: "center", backgroundColor: 'green' }}>
                        <Icon name="md-refresh" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                <TouchableOpacity onPress={() => { Id_pesquisar == null ? Alert.alert("O campo de id não pode ser vazio") : this.localizaBiblioteca(Id_pesquisar) }} style={{ alignItems: "center", backgroundColor: 'green' }}>
                        <Icon name="md-search" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() => { formularioId == null ? Alert.alert("O campo de id não pode ser vazio") : this.deleteBiblioteca(Id_pesquisar) }} style={{ alignItems: "center", backgroundColor: 'green' }}>
                        <Icon name="md-remove" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                {bibliotecaList}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textInput:{
        alignItems: "center", 
        width: 200, 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1 
    },
    containerTouch:{
        width: 200,
         padding: 10
    }
});