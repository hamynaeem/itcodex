import { Injectable, inject } from '@angular/core';
import { 
  Firestore, 
  collection, 
  doc, 
  addDoc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private firestore = inject(Firestore);

  /**
   * Add a new document to a collection
   */
  async addDocument(
    collectionName: string, 
    data: any
  ): Promise<{ success: boolean; id?: string; error?: any }> {
    try {
      const docData = {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const docRef = await addDoc(collection(this.firestore, collectionName), docData);
      
      return {
        success: true,
        id: docRef.id
      };
    } catch (error) {
      console.error(`Error adding document to ${collectionName}:`, error);
      return {
        success: false,
        error: error
      };
    }
  }

  /**
   * Set a document with a specific ID
   */
  async setDocument(
    collectionName: string, 
    docId: string, 
    data: any,
    merge: boolean = false
  ): Promise<{ success: boolean; error?: any }> {
    try {
      const docData = {
        ...data,
        updatedAt: new Date()
      };

      if (!merge) {
        docData.createdAt = new Date();
      }

      const docRef = doc(this.firestore, collectionName, docId);
      await setDoc(docRef, docData, { merge });
      
      return { success: true };
    } catch (error) {
      console.error(`Error setting document in ${collectionName}:`, error);
      return {
        success: false,
        error: error
      };
    }
  }

  /**
   * Get a single document by ID
   */
  async getDocument(
    collectionName: string, 
    docId: string
  ): Promise<any> {
    try {
      const docRef = doc(this.firestore, collectionName, docId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          // Convert Firestore timestamps to JavaScript dates
          createdAt: (data as any).createdAt?.toDate?.() || (data as any).createdAt,
          updatedAt: (data as any).updatedAt?.toDate?.() || (data as any).updatedAt
        };
      }
      
      return null;
    } catch (error) {
      console.error(`Error getting document from ${collectionName}:`, error);
      return null;
    }
  }

  /**
   * Get all documents from a collection
   */
  async getCollection(
    collectionName: string, 
    orderByField?: string, 
    orderDirection: 'asc' | 'desc' = 'asc',
    limitCount?: number
  ): Promise<any[]> {
    try {
      let q = collection(this.firestore, collectionName);
      let queryRef: any = q;

      if (orderByField) {
        queryRef = query(q, orderBy(orderByField, orderDirection));
      }

      if (limitCount) {
        queryRef = query(queryRef, limit(limitCount));
      }

      const querySnapshot = await getDocs(queryRef);
      const documents: any[] = [];

      querySnapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data();
        const docData = data as any;
        documents.push({
          id: docSnapshot.id,
          ...docData,
          createdAt: docData.createdAt?.toDate?.() || docData.createdAt,
          updatedAt: docData.updatedAt?.toDate?.() || docData.updatedAt
        });
      });

      return documents;
    } catch (error) {
      console.error(`Error getting collection ${collectionName}:`, error);
      return [];
    }
  }

  /**
   * Query documents with conditions
   */
  async queryDocuments(
    collectionName: string,
    conditions: Array<{ field: string; operator: any; value: any }>,
    orderByField?: string,
    orderDirection: 'asc' | 'desc' = 'asc',
    limitCount?: number
  ): Promise<any[]> {
    try {
      let q = collection(this.firestore, collectionName);
      let queryRef: any = q;

      // Apply where conditions
      for (const condition of conditions) {
        queryRef = query(queryRef, where(condition.field, condition.operator, condition.value));
      }

      // Apply ordering
      if (orderByField) {
        queryRef = query(queryRef, orderBy(orderByField, orderDirection));
      }

      // Apply limit
      if (limitCount) {
        queryRef = query(queryRef, limit(limitCount));
      }

      const querySnapshot = await getDocs(queryRef);
      const documents: any[] = [];

      querySnapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data();
        const docData = data as any;
        documents.push({
          id: docSnapshot.id,
          ...docData,
          createdAt: docData.createdAt?.toDate?.() || docData.createdAt,
          updatedAt: docData.updatedAt?.toDate?.() || docData.updatedAt
        });
      });

      return documents;
    } catch (error) {
      console.error(`Error querying ${collectionName}:`, error);
      return [];
    }
  }

  /**
   * Update a document
   */
  async updateDocument(
    collectionName: string, 
    docId: string, 
    data: any
  ): Promise<{ success: boolean; error?: any }> {
    try {
      const docRef = doc(this.firestore, collectionName, docId);
      const updateData = {
        ...data,
        updatedAt: new Date()
      };

      await updateDoc(docRef, updateData);
      
      return { success: true };
    } catch (error) {
      console.error(`Error updating document in ${collectionName}:`, error);
      return {
        success: false,
        error: error
      };
    }
  }

  /**
   * Delete a document
   */
  async deleteDocument(
    collectionName: string, 
    docId: string
  ): Promise<{ success: boolean; error?: any }> {
    try {
      const docRef = doc(this.firestore, collectionName, docId);
      await deleteDoc(docRef);
      
      return { success: true };
    } catch (error) {
      console.error(`Error deleting document from ${collectionName}:`, error);
      return {
        success: false,
        error: error
      };
    }
  }

  /**
   * Check if a document exists
   */
  async documentExists(collectionName: string, docId: string): Promise<boolean> {
    try {
      const docRef = doc(this.firestore, collectionName, docId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists();
    } catch (error) {
      console.error(`Error checking if document exists in ${collectionName}:`, error);
      return false;
    }
  }
}