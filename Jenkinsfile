pipeline {
    agent any

    stages {
        stage('Clonar Repositório') {
            steps {
                checkout scm
            }
        }

        stage('Instalar Dependências') {
            steps {
                script {
                    npm install
                }
            }
        }

        stage('Executar Testes') {
            steps {
                script {
                    npx test
                }
            }
        }

        stage('Construr a imagem') {
            steps {
                script {
                    npm run build
                }
            }
        }

        // stage('Publicar Artefato') {
        //     steps {
        //         script {
        //             // Aqui você pode fazer upload do artefato para um servidor ou serviço de hospedagem
        //             // Por exemplo, se estiver usando AWS S3:
        //             sh 'aws s3 cp build/ seu-bucket/'
        //         }
        //     }
        // }
    }

    post {
        success {
            echo 'Pipeline executado com sucesso! Pode implantar sua aplicação.'
        }

        failure {
            echo 'Pipeline falhou. Verifique os logs e corrija os problemas.'
        }
    }
}
