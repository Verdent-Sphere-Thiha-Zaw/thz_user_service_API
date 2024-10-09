def call(String nodeVersion) {
    stage('Setup Node Environment') {
        echo "Setting up Node.js version: ${nodeVersion}"
        sh "nvm install ${nodeVersion}" // Assuming nvm is installed
        sh "nvm use ${nodeVersion}"
    }
}
