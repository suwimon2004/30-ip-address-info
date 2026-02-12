pipeline {
  environment {
    VERCEL_PROJECT_NAME = '30-devops-quiz'
    VERCEL_TOKEN = credentials('DevOps30-vercel')
  }

  agent {
    kubernetes {
      yaml '''
        apiVersion: v1
        kind: Pod
        spec:
          containers:
          - name: my-builder
            image: node:20-alpine
            command:
            - cat
            tty: true
      '''
    }
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Test npm') {
      steps {
        container('my-builder') {
          sh 'npm --version'
          sh 'node --version'
        }
      }
    }

    stage('Build') {
      steps {
        container('my-builder') {
          sh 'npm ci'
          sh 'npm run build'
        }
      }
    }

    stage('Deploy') {
      steps {
        container('my-builder') {
          sh 'npm install -g vercel@latest'
          sh '''
            vercel link --project $VERCEL_PROJECT_NAME --token $VERCEL_TOKEN --yes
            vercel --token $VERCEL_TOKEN --prod --confirm
          '''
        }
      }
    }
  }
}
