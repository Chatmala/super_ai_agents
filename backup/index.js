const admin = require('firebase-admin');

if (process.env.NODE_ENV === 'production') {
  // Get the configuration values
  const functionConfig = process.env.FIREBASE_CONFIG 
    ? JSON.parse(process.env.FIREBASE_CONFIG)
    : {};

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: functionConfig.service_account.project_id,
      clientEmail: functionConfig.service_account.client_email,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })
  });
} else {
  // Local development
  const serviceAccount = require('../config/firebase-adminsdk.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

// Add your functions here
