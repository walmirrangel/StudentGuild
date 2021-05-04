import styles  from '../styles/components/Sobre.module.css'

export default function Sobre() {


    return (
        <div className={styles.container}>
            <div>
                    <h1>Obrigado por jogar!!</h1>
                    <div className={styles.texto}>
                        <h3>Meu nome é walmir Rangel e eu sou o idealizador deste projeto.</h3>
                        <h3>A intenção do projeto é ajudar os estudantes a estudarem de uma forma mais descontraída, utiliza de mecânicas similares a jogos para estimular o uso contínuo da ferramenta.</h3>
                        <h3>Como se trata de uma ferramenta de estudo, o uso continuo e persistente do usuário trará um retorno de evolução acadêmica sem que ele perceba inicialmente, pois ele se esforça para se manter no alto do ranking entre os amigos e ter os melhores itens do jogo. Só que para isso ele deve responder corretamente inúmeras questões referentes as matérias de estudo do currículo dele, fazendo com que ele aprenda enquanto se diverte.</h3>    
                        <h3>Como idealizador, espero que a ferramenta tenha sucesso na aquisição do seu propósito.</h3>
                        <h3>Agradeço a ajuda e orientação da professora Priscilla durante o processo de desenvolvimento do trabalho, a minha família que me ajudou durante todo meu processo de formação e a todos que participaram deste projeto.</h3>
                    </div>
                    <h3 className={styles.texto2}>Para acessar o fonte do projeto, acesse: <a target="_blank" href="https://github.com/walmirrangel/StudentGuild">GitHub</a></h3>
            </div>
        </div>
    )
}
