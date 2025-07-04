# NoSQL Database Design Project – Phase 3 (MongoDB Implementation)

This project demonstrates the **NoSQL implementation** of a healthcare database system using **MongoDB**, reimagining the relational model from [Phase 1](https://github.com/panditpooja/data-modeling-relational-database-sql) and [Phase 2](https://github.com/panditpooja/relational-database-sql-implementation).  

Instead of a normalized relational schema, this phase applies **document-oriented modeling principles** to design a denormalized structure suitable for MongoDB. It showcases key NoSQL concepts such as aggregate boundaries, flexible schema design, and analytics using aggregation pipelines.

---

## 📖 Overview

The goal of this project was to migrate from a relational database model to a **document-based NoSQL model** optimized for MongoDB. Key steps include:

- **Aggregate Boundary Design**: Defining logical boundaries for data embedding, selecting `appointments` as the root document with embedded patient, doctor, and billing information.  
- **Collection Creation**: Designing and populating a single MongoDB collection with denormalized documents.  
- **Querying**: Implementing `find()` queries for data retrieval and `aggregate()` pipelines for advanced analytics.  
- **Design Rationale**: Documenting the reasoning behind the denormalized design and aggregate boundary selection.

---

## 📂 Repository Structure
```
📦 nosql-database-implementation-mongodb
├── collection_creation.js # MongoDB script to create and populate the 'appointments' collection
├── collection.json # JSON file with embedded appointment documents
├── find_queries.js # MongoDB find() queries with explanations
├── aggregate_pipelines.js # Aggregation pipelines for analytics and summaries
└── collection.pdf # Explanation of aggregate boundary and design decisions
```

---

## 🧠 Key Skills Demonstrated
- NoSQL database design with **MongoDB**  
- Modeling **aggregate boundaries** and denormalized data structures  
- Implementing embedded documents for optimized query performance  
- Writing **find() queries** and advanced **aggregation pipelines**  
- Comparing relational vs. document-based design philosophies  

---

## 🛠 Tools & Technologies
- **MongoDB** – Document-based NoSQL database  
- **JavaScript (Mongo shell)** – For database creation and query scripts  
- **Aggregation Framework** – For data analytics within MongoDB  
- **PDF & JSON** – For documentation and raw data representation

---

## 📎 Related Work
This project complements earlier relational database phases by exploring the NoSQL approach:

- 🧱 [Phase 1 – Relational Data Modeling](https://github.com/panditpooja/data-modeling-relational-database-sql)  
- 🛠️ [Phase 2 – SQL Database Implementation](https://github.com/panditpooja/relational-database-sql-implementation)

---

## ✍️ Author
Pooja Pandit  
Master’s Student in Information Science (Machine Learning)  
The University of Arizona
