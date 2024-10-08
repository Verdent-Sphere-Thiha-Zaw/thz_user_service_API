pipeline {
    agent any  // Use any available agent

    stages {
        stage('Checkout') {
            steps {
                // Checkout the source code using the SCM defined in the Jenkins job configuration
                checkout scm
            }
        }

        stage('Check PATH') {
            steps {
                sh 'echo $PATH'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                sh '/root/.nvm/versions/node/v22.9.0/bin/node -v'
                sh '/root/.nvm/versions/node/v22.9.0/bin/node -v'
                sh '/root/.nvm/versions/node/v22.9.0/bin/node install'
            }
        }

        stage('Run Tests') {
            steps {
                // Run tests
                sh '/root/.nvm/versions/node/v22.9.0/bin/node test'
            }
        }

        stage('Build') {
            steps {
                // Build the application (adjust if you have a specific build script)
                sh '/root/.nvm/versions/node/v22.9.0/bin/node run build'
            }
        }

        // stage('Deploy') {
        //     steps {
        //         // Deployment steps (adjust according to your needs)
        //         // Example: Deploying using SSH
        //         sh '''
        //             ssh user@your-server "cd /path/to/your/app && git pull && npm install && npm run start"
        //         '''
        //     }
        // }
    }

    post {
        success {
            // Actions to take on successful build
            echo 'Build succeeded!'
        }
        failure {
            // Actions to take on build failure
            echo 'Build failed!'
        }
    }
}
