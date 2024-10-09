@Library('my-shared-library@VSUS-02') _  // Adjust the library and branch as needed

pipeline {
    agent any  // You can specify a particular agent if needed

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Setup Node Environment') {
            steps {
                script {
                    // Call the commonPipeline function from the shared library
                    commonPipeline('14')  // Specify your desired Node.js version
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Call a utility function from the shared library
                    com.example.Utilities.printMessage("Running tests...")

                    // Run your tests here
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }
    }

    post {
        always {
            // Cleanup actions or notifications can go here
            echo 'Cleaning up...'
        }
        success {
            echo 'Tests passed!'
        }
        failure {
            echo 'Tests failed!'
        }
    }
}
