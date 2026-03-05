# 🔥 Firebase Setup Guide for Furniture Hub

## 📋 Current Status
Your Firebase configuration is already set up with the following project details:
- **Project ID**: `furniturehub-dc031`
- **Auth Domain**: `furniturehub-dc031.firebaseapp.com`
- **Storage Bucket**: `furniturehub-dc031.firebasestorage.app`

## 🔍 Connection Test Results
The admin dashboard now includes a Firebase connection test that will show:
- 🔄 **Testing connection...** - When checking connection
- ✅ **Connected to Firebase** - When connection is successful
- ❌ **Connection failed** - When there are issues

## 🛠️ Required Firebase Setup Steps

### 1. Enable Firestore Database
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: `furniturehub-dc031`
3. In the left menu, click **Firestore Database**
4. Click **Create database**
5. Choose **Start in test mode** (allows read/write access for 30 days)
6. Select a location (choose closest to your users)
7. Click **Enable**

### 2. Set Up Firestore Security Rules
After testing, update your security rules to secure your data:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products collection - read access for all, write access for authenticated users
    match /products/{documentId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 3. Enable Authentication (Optional but Recommended)
1. In Firebase Console, go to **Authentication**
2. Click **Get started**
3. Enable **Email/Password** authentication
4. This will allow you to secure your admin dashboard

### 4. Check Environment Variables
Your `.env` file should contain:
```
VITE_FIREBASE_API_KEY=AIzaSyBlTeNflsVUl28Rkrfk2hcSNhb1y7iv_OI
VITE_FIREBASE_AUTH_DOMAIN=furniturehub-dc031.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=furniturehub-dc031
VITE_FIREBASE_STORAGE_BUCKET=furniturehub-dc031.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=610666953219
VITE_FIREBASE_APP_ID=1:610666953219:web:c67f93f078819e45e76c36
VITE_FIREBASE_MEASUREMENT_ID=G-61KM3CFHMW
```

## 🧪 Testing the Connection

1. Start your development server: `npm run dev`
2. Navigate to the admin dashboard
3. Check the connection status indicator below the welcome message
4. Open browser console (F12) to see detailed connection logs

## 🚨 Common Issues & Solutions

### Issue: "permission-denied" error
**Solution**: Update Firestore security rules or enable test mode

### Issue: "unavailable" error
**Solution**: Check internet connection and Firebase project status

### Issue: "unauthenticated" error
**Solution**: Check authentication rules or enable test mode

### Issue: Products not loading
**Solution**: Ensure Firestore database is created and accessible

## 📦 Adding Your First Products

Once Firebase is connected:
1. Go to Admin Dashboard
2. Click "Add Product" in Quick Actions
3. Fill in product details
4. Save to add to Firestore

## 🔧 Development Tips

- Check browser console for detailed error messages
- Use Firebase Console to verify data is being saved
- Test security rules in the Firebase Console Rules simulator
- Keep your `.env` file secure and never commit to Git

## 📞 Need Help?

If you're still having issues:
1. Check the browser console for specific error messages
2. Verify your Firebase project is active and not disabled
3. Ensure Firestore Database is enabled in your project
4. Contact Firebase support if project issues persist

---

**Next Steps**: Open your admin dashboard at `http://localhost:5174/admin` to test the connection!
