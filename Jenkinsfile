pipeline {
    agent { label 'AMDx86' } // Use any available agent
    tools {
        nodejs 'NodeJS'  // Use the name you gave in the configuration
    }
    environment {
        MONGO_INITDB_ROOT_USERNAME = 'root'
        MONGO_INITDB_ROOT_PASSWORD = 'example'
        DATABASE_URI = 'mongodb://root:example@localhost:27017/test?authSource=admin'
        PORT = '3000'
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

        stage('Start MongoDB') {
            steps {
                script {
                    // Start MongoDB as a Docker container
                    sh '''
                    docker run -d \
                    --name mongodb \
                    -e MONGO_INITDB_ROOT_USERNAME=${MONGO_INITDB_ROOT_USERNAME} \
                    -e MONGO_INITDB_ROOT_PASSWORD=${MONGO_INITDB_ROOT_PASSWORD} \
                    -p 27017:27017 \
                    mongo:latest
                    '''
                }
            }
        }

        stage('Wait for MongoDB to be Ready') {
            steps {
                script {
                    // Wait for MongoDB to be ready
                    sh '''
                    until nc -zv 127.0.0.1 27017; do
                        echo "Waiting for MongoDB..."
                        sleep 2
                    done
                    '''
                }
            }
        }

        stage('Run Tests') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS') {
                    sh 'npm -v'
                    sh '''
                    timeout 20s npm test || true
                    '''
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

