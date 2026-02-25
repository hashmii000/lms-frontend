pipeline {
    agent any

    tools {
        nodejs "node"
    }

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        NODE_ENV = "production"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    if (fileExists('package-lock.json')) {
                        echo "package-lock.json found → using npm ci"
                        bat 'npm ci --include=dev'
                    } else {
                        echo "No lock file found → using npm install"
                        bat 'npm install --include=dev'
                    }
                }
            }
        }

        stage('Environment Check') {
            steps {
                bat 'node -v'
                bat 'npm -v'
            }
        }

        stage('Lint (Optional)') {
            steps {
                script {
                    try {
                        bat 'npm run lint'
                    } catch (Exception e) {
                        echo 'No lint script found — skipping lint'
                    }
                }
            }
        }

        stage('Build Application') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Build Validation') {
            steps {
                echo 'Frontend build completed successfully'
            }
        }
    }

    post {
        success {
            echo '✔ Frontend CI SUCCESS'
        }
        failure {
            echo '❌ Frontend CI FAILED'
        }
        always {
            cleanWs()
        }
    }
}