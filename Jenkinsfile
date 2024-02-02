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
