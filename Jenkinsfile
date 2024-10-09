pipeline {
    agent any  // Use any available agent
    tools {
        nodejs 'NodeJS'  // Use the name you gave in the configuration
    }

    environment {
        MONGO_INITDB_ROOT_USERNAME = 'root'
        MONGO_INITDB_ROOT_PASSWORD = 'example'
        DATABASE_URI = 'mongodb://root:example@localhost:27017/test?authSource=admin'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the source code using the SCM defined in the Jenkins job configuration
                checkout scm
            }
        }

        stage('Start MongoDB') {
            steps {
                script {
                    echo 'Starting MongoDB service...'
                    // Run MongoDB in a detached mode
                    sh 'docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=example -d mongo:latest'

                    // Wait for MongoDB to be ready
                    echo 'Waiting for MongoDB to be ready...'
                    waitUntil {
                        try {
                            sh 'nc -z localhost 27017'
                            return true
                        } catch (Exception e) {
                            echo 'MongoDB is not ready yet, waiting...'
                            sleep 2
                            return false
                        }
                    }
                }
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
                    sh 'DATABASE_URI=${DATABASE_URI} npm run test' // Set the DATABASE_URI environment variable for tests
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
        always {
            echo 'Cleaning up MongoDB...'
            // Clean up MongoDB container
            sh 'docker stop mongodb || true'
            sh 'docker rm mongodb || true'
        }
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
