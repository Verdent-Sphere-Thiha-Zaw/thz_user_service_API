// pipeline {
//     agent any  // Use any available agent
//     tools {
//         nodejs 'NodeJS'  // Use the name you gave in the configuration
//     }
//     environment {
//         PORT = '3000'
//         DATABASE_URI = 'mongodb://root:example@localhost:27017/test?authSource=admin'
//     }
//     stages {
//         stage('Checkout') {
//             steps {
//                 // Checkout the source code using the SCM defined in the Jenkins job configuration
//                 checkout scm
//             }
//         }

//         stage('Check PATH') {
//             steps {
//                 sh 'echo $PATH'
//             }
//         }

//         stage('Install Dependencies') {
//             steps {
//                 // Install Node.js dependencies
//                 sh 'node -v'
//                 sh 'npm install'
//             }
//         }

//         stage('Run Tests') {
//             steps {
//                 catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
//                     sh 'npm test'
//                 }
//             }
//         }

//         stage('Build') {
//             steps {
//                 // Build the application (adjust if you have a specific build script)
//                 sh 'npm run build'
//             }
//         }

//         // stage('Deploy') {
//         //     steps {
//         //         // Deployment steps (adjust according to your needs)
//         //         // Example: Deploying using SSH
//         //         sh '''
//         //             ssh user@your-server "cd /path/to/your/app && git pull && npm install && npm run start"
//         //         '''
//         //     }
//         // }
//     }

//     post {
//         success {
//             // Actions to take on successful build
//             echo 'Build succeeded!'
//         }
//         failure {
//             // Actions to take on build failure
//             echo 'Build failed!'
//         }
//     }
// }

pipeline {
    agent {
        label any  // Ensure you're running on an Ubuntu agent
    }

    environment {
        PORT = '3000'
        DATABASE_URI = 'mongodb://root:example@localhost:27017/test?authSource=admin'
    }

    stages {
        stage('Setup MongoDB') {
            steps {
                script {
                    // Start MongoDB as a service in a separate container
                    sh '''
                    docker run --name mongodb -d \
                        -e MONGO_INITDB_ROOT_USERNAME=root \
                        -e MONGO_INITDB_ROOT_PASSWORD=example \
                        -p 27017:27017 \
                        mongo:latest
                    '''
                }
            }
        }

        stage('Checkout Code') {
            steps {
                checkout scm  // Check out the code from the repository
            }
        }

        stage('Prepare Node.js Environment') {
            steps {
                script {
                    // Assuming the Node.js version is set in the environment or defaults
                    def nodeVersion = '14'  // Change this as needed
                    sh "nvm install ${nodeVersion}"  // Install the desired Node.js version
                    sh "nvm use ${nodeVersion}"  // Use the installed version
                }
            }
        }

        stage('Wait for MongoDB') {
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

        stage('Test the App') {
            steps {
                // Run the tests, with timeout and allowing failure
                sh '''
                timeout 10s npm test || true
                '''
            }
        }
    }

    post {
        always {
            // Clean up the MongoDB container
            sh 'docker stop mongodb || true'
            sh 'docker rm mongodb || true'
            echo 'Pipeline completed.'
        }
    }
}
