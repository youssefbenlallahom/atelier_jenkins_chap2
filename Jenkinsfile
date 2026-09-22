pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/youssefbenlallahom/atelier_jenkins_chap2.git',
                    credentialsId: 'github-creds'
            }
        }

        stage('Installation des dépendances') {
            steps {
                sh 'npm install'
            }
        }

        stage('Tests unitaires') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build du livrable') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Archivage') {
            steps {
                archiveArtifacts artifacts: 'target/*', fingerprint: true
            }
        }
    }

    post {
        failure {
            mail to: 'youssef.benlallahom@esprit.tn',
                 subject: "Échec du build : ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "Le build a échoué. Voir les logs : ${env.BUILD_URL}"
        }
    }
}
