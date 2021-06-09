import styles  from '../styles/components/Sobre.module.css'

export default function Sobre() {


    return (
        <div className={styles.container}>
            <div>
                    <h1>Obrigado por jogar!!</h1>
                    <div className={styles.texto}>
                        <h3>Meu nome é Walmir Rangel e eu sou o idealizador deste projeto.</h3>
                        <h3>A intenção do projeto é ajudar os estudantes a estudarem de uma forma mais descontraída, utilizando de mecânicas similares a jogos de RPG, buscando estimular o progresso do aluno em seus estudos e a utilização continua da ferramenta para vencer desafios ligados aos estudos do aluno.</h3>
                        <h3>Como se trata de uma ferramenta de estudo, o uso continuo e persistente do jogador trará um retorno de evolução acadêmica sem que ele perceba inicialmente, pois ele se esforça para conseguir melhores equipamentos e subir no ranking, fazendo com que participe continuamente dos desafios e acabe entendendo diversas questões relacionadas a importantes matérias de estudo. No processo dessa evolução, o jogador deve notar uma evolução acadêmica e perceber que o estudo é uma ferramenta importante no seu dia a dia e não precisa ser algo cansativo, pode também ser algo prazeroso.</h3>    
                        <h3>Como idealizador, espero que a ferramenta tenha sucesso na aquisição do seu propósito.</h3>
                        <h3>Agradeço a ajuda e orientação da professora Priscilla durante o processo de desenvolvimento do trabalho, a minha família que me ajudou durante todo meu processo de formação e a todos que participaram deste projeto.</h3>
                    </div>
                    <h3 className={styles.texto2}>Para acessar o fonte do projeto, acesse: <a target="_blank" href="https://github.com/walmirrangel/StudentGuild">GitHub</a></h3>
            </div>
        </div>
    )
}
