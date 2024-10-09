@Library('my-shared-library') _  // Load the shared library

pipeline {
    agent any

    parameters {
        string(name: 'NODE_VERSION', defaultValue: '14', description: 'Node.js version')
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Checkout code from the repository
                checkout scm
            }
        }

        stage('Setup Node') {
            steps {
                // Call the reusable function from the shared library
                commonPipeline(params.NODE_VERSION)
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Using the utility function from the shared library
                    com.example.Utilities.printMessage("Running tests...")
                    sh 'npm test'
                }
            }
        }
    }

    post {
        always {
            echo "Cleaning up..."
            // Add any cleanup steps if necessary
        }
    }
}
