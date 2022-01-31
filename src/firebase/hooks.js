import { collection, doc, getFirestore } from "firebase/firestore";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { firebaseApp } from "./app";

export const useFirebaseCollection = (collectionName) => {
  return useCollection(
    collection(getFirestore(firebaseApp), collectionName),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
}

export const useFirebaseDocument = (collectionName, documentId) => {
  return useDocument(
    doc(collection(getFirestore(firebaseApp), collectionName), documentId),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )
}