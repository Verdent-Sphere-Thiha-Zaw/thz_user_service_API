pipeline {
    agent any  // Use any available agent
    tools {
        nodejs 'NodeJS'  // Use the name you gave in the configuration
    }
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
                sh 'node -v'
                sh 'npm install -g'
            }
        }

        stage('Run Tests') {
            steps {
                // Run tests
                sh 'node -v'
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                // Build the application (adjust if you have a specific build script)
                sh 'node -v'
                sh 'npm install'
                sh 'npm run build'
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
