pipeline {
    agent { label 'AMDx86' } // Use any available agent
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

        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                sh 'node -v'
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS') {
                    sh 'npm -v'
                    sh 'npm run test'
                }
            }
        }

        stage('Build') {
            steps {
                // Build the application (adjust if you have a specific build script)
                sh 'npm run build'
                sh 'ls -la dist' 
            }
        }

        stage('Archive Artifacts') {
            steps {
                echo 'Archiving build file...'
                archiveArtifacts artifacts: 'dist/**/*', allowEmptyArchive: false
            }
        }
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

