def call(String nodeVersion) {
    echo "Setting up Node.js version ${nodeVersion}"
    sh "nvm install ${nodeVersion}"
    sh "nvm use ${nodeVersion}"
}
