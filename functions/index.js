const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});
const db = admin.firestore();

exports.getUsersByCollection = functions.https.onCall(async (data, context) => {
  var documents = [];
  var temp = [];
  var collectionRef = db.collection(data.collection);
  var allDocuments = await collectionRef.get();
  allDocuments.forEach((doc) => {
    temp.push(doc);
  });
  for (const doc of temp) {
    const userCred = await admin.auth().getUser(doc.id);
    const userInfo = doc.data();
    const user = {
      ...userCred,
      ...userInfo,
    };
    documents.push(user);
  }
  return documents;
});

exports.deleteUser = functions.https.onCall(async (data, context) => {
  await admin.auth().deleteUser(data.uid);
});

export const getEmail = functions.firestore
  .document()
  .onCreate((snapshot, context) => {
    const rewdata = snapshot.data();
  });

exports.getEmail = functions.https.onCall(async (data, context) => {
  await admin
    .getAuth()
    .getUser(uid)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
    })
    .catch((error) => {
      console.log("Error fetching user data:", error);
    });
});

exports.getAllUsers = functions.https.onCall(async (data, context) => {
  try {
    const users = [];
    var res;
    if (data === "") {
      res = await admin.auth().listUsers(1000);
    } else {
      res = await admin.auth().listUsers(1000, data);
    }
    res.users.forEach((record) => {
      users.push(record.toJSON());
    });
    if (res.pageToken) {
      return users.concat(this.getAllUsers(res.pageToken));
    } else {
      return users;
    }
  } catch (err) {
    throw err;
  }
});
