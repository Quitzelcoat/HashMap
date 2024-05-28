class HashMap {
  constructor() {
    this.buckets = new Array(50);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);

    // Check if the index is within bounds
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    // Initialize bucket if necessary
    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    // Check for existing key and update value if found
    for (let pair of this.buckets[index]) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }

    // If the key does not exist, add the new key-value pair
    this.buckets[index].push([key, value]);
  }

  get(key) {
    const index = this.hash(key);

    // Check if the index is within bounds
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    // If the bucket is empty, return null
    if (!this.buckets[index]) {
      return null;
    }

    // return the value assigned to the key.
    for (let pair of this.buckets[index]) {
      if (pair[0] === key) {
        return pair[1];
      }
    }

    return null;
  }

  has(key) {
    const index = this.hash(key);

    // Check if the index is within bounds
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    // If the bucket is empty, return false
    if (!this.buckets[index]) {
      return false;
    }

    // Search for the key in the bucket
    for (let pair of this.buckets[index]) {
      if (pair[0] === key) {
        return true;
      }
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);

    // Check if the index is within bounds
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    // If the bucket is empty, return false
    if (!this.buckets[index]) {
      return false;
    }

    // Search for the key in the bucket
    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i][0] === key) {
        this.buckets[index].splice(i, 1); // remove the key-value pair
        return true;
      }
    }

    return false;
  }

  length() {
    let count = 0;

    for (let bucket of this.buckets) {
      if (bucket) {
        count += bucket.length;
      }
    }
    return count;
  }

  clear() {
    this.buckets = new Array(50);
  }

  keys() {
    let allKeys = [];

    for (let bucket of this.buckets) {
      if (bucket) {
        for (let pair of bucket) {
          allKeys.push(pair[0]);
        }
      }
    }

    return allKeys;
  }

  values() {
    let allValues = [];

    for (let bucket of this.buckets) {
      if (bucket) {
        for (let pair of bucket) {
          allValues.push(pair[1]);
        }
      }
    }

    return allValues;
  }

  entries() {
    let allEntries = [];

    for (let bucket of this.buckets) {
      if (bucket) {
        for (let pair of bucket) {
          allEntries.push([pair[0], pair[1]]);
        }
      }
    }

    return allEntries;
  }
}

class HashSet {
  constructor() {
    this.map = new HashMap();
  }

  // Add a key to the HashSet
  add(key) {
    this.map.set(key, true);
  }

  // Check if a key exists in the HashSet
  has(key) {
    return this.map.has(key);
  }

  // Remove a key from the HashSet
  delete(key) {
    return this.map.remove(key);
  }

  // Return the number of keys in the HashSet
  size() {
    return this.map.length();
  }

  // Remove all keys from the HashSet
  clear() {
    this.map.clear();
  }

  // Return an array containing all keys in the HashSet
  keys() {
    return this.map.keys();
  }
}
