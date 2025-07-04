use hms;

// Dropping existing appointments collection if it exists to start fresh
db.appointments.drop();

/*
  Note: The SQL enum field `available_days` was converted into an array of full day names
  (e.g., ["Monday", "Tuesday", ...]) to ensure logical querying, easier filtering,
  and improved readability in MongoDB.
*/

// Inserting multiple appointment documents in one operation
db.appointments.insertMany([
  {
    "appointment_id": "a001",
    "appointment_date": ISODate("2025-12-02"),
    "appointment_time": "10:00:00",
    "status": "Scheduled",
    "diagnosis": null,
    "prescription": null,
    "is_deleted": 0,
    "patient": {
      "patient_id": "p001",
      "first_name": "John",
      "last_name": "Doe",
      "date_of_birth": ISODate("1990-05-14"),
      "gender": "Male",
      "contact_number": "(123)4567890",
      "address": "123 Maple Street, New York, NY 10001, USA",
      "email": "john@example.com",
      "emergency_contact_name": "Jane Doe",
      "emergency_contact_number": "(223)3445566",
      "is_deleted": 0
    },
    "doctor": {
      "doctor_id": "doc002",
      "first_name": "Rajesh",
      "last_name": "Gupta",
      "role": "Neurologist",
      "contact_number": "(223)3445566",
      "email": "r.gupta@hospital.com",
      "available_days": ["Tuesday","Thursday","Saturday"],
      "is_deleted": 0,
      "department": {
        "department_id": "dep002",
        "department_name": "Neurology",
        "is_deleted": 0
      }
    },
    "billing": null
  },
  {
    "appointment_id": "a002",
    "appointment_date": ISODate("2025-02-14"),
    "appointment_time": "14:30:00",
    "status": "Completed",
    "diagnosis": "Flu",
    "prescription": "Paracetamol",
    "is_deleted": 0,
    "patient": {
      "patient_id": "p002",
      "first_name": "Alice",
      "last_name": "Smith",
      "date_of_birth": ISODate("1985-09-23"),
      "gender": "Female",
      "contact_number": "(987)6543210",
      "address": "456 Oak Avenue, Los Angeles, CA 90012, USA",
      "email": "alice@example.com",
      "emergency_contact_name": "Michael Smith",
      "emergency_contact_number": "(667)7889900",
      "is_deleted": 0
    },
    "doctor": {
      "doctor_id": "doc003",
      "first_name": "Samuel",
      "last_name": "Thompson",
      "role": "Pediatrician",
      "contact_number": "(334)4556677",
      "email": "s.thompson@hospital.com",
      "available_days": ["Monday","Tuesday","Thursday","Friday"],
      "is_deleted": 0,
      "department": {
        "department_id": "dep003",
        "department_name": "Pediatrics",
        "is_deleted": 0
      }
    },
    "billing": {
      "bill_id": "b001",
      "total_amount": 257.99,
      "payment_status": "Paid",
      "is_deleted": 0,
      "medicines": [
        {
          "medicine_id": "m002",
          "medicine_name": "Ibuprofen",
          "quantity": 1,
          "unit_price": 15.0,
          "supplier": "HealthPlus",
          "expiry_date": ISODate("2025-09-30"),
          "is_deleted": 0
        },
        {
          "medicine_id": "m001",
          "medicine_name": "Paracetamol",
          "quantity": 2,
          "unit_price": 10.0,
          "supplier": "MediCorp",
          "expiry_date": ISODate("2026-01-01"),
          "is_deleted": 0
        }
      ]
    }
  },
  {
    "appointment_id": "a003",
    "appointment_date": ISODate("2025-03-21"),
    "appointment_time": "09:00:00",
    "status": "Walk-In",
    "diagnosis": null,
    "prescription": null,
    "is_deleted": 0,
    "patient": {
      "patient_id": "p003",
      "first_name": "Robert",
      "last_name": "Brown",
      "date_of_birth": ISODate("1992-07-30"),
      "gender": "Male",
      "contact_number": "(564)7382910",
      "address": "789 Pine Road, Chicago, IL 60611, USA",
      "email": "robert@example.com",
      "emergency_contact_name": "Laura Brown",
      "emergency_contact_number": "(334)4556677",
      "is_deleted": 0
    },
    "doctor": {
      "doctor_id": "doc001",
      "first_name": "Abhimanyu",
      "last_name": "Pandey",
      "role": "Cardiologist",
      "contact_number": "(112)2334455",
      "email": "abhimanyu.pandey@hospital.com",
      "available_days": ["Monday","Wednesday","Friday"],
      "is_deleted": 0,
      "department": {
        "department_id": "dep001",
        "department_name": "Cardiology",
        "is_deleted": 0
      }
    },
    "billing": null
  },
  {
    "appointment_id": "a004",
    "appointment_date": ISODate("2025-02-28"),
    "appointment_time": "16:15:00",
    "status": "Cancelled",
    "diagnosis": null,
    "prescription": null,
    "is_deleted": 0,
    "patient": {
      "patient_id": "p004",
      "first_name": "Emily",
      "last_name": "Johnson",
      "date_of_birth": ISODate("1998-12-01"),
      "gender": "Female",
      "contact_number": "(110)0223344",
      "address": "101 Birch Lane, Houston, TX 77002, USA",
      "email": "emily@example.com",
      "emergency_contact_name": "Daniel Johnson",
      "emergency_contact_number": "(778)8990011",
      "insurances": [
        {
          "insurance_id": "ins001",
          "policy_number": "POL-EJ-300",
          "coverage_amount": 2000,
          "expiry_date": ISODate("2025-02-28"),
          "is_deleted": 0
        }
      ],
      "is_deleted": 0
    },
    "doctor": {
      "doctor_id": "doc002",
      "first_name": "Rajesh",
      "last_name": "Gupta",
      "role": "Neurologist",
      "contact_number": "(223)3445566",
      "email": "r.gupta@hospital.com",
      "available_days": ["Tuesday","Thursday","Saturday"],
      "is_deleted": 0,
      "department": {
        "department_id": "dep002",
        "department_name": "Neurology",
        "is_deleted": 0
      }
    },
    "billing": null
  },
  {
    "appointment_id": "a005",
    "appointment_date": ISODate("2025-01-29"),
    "appointment_time": "11:45:00",
    "status": "Completed",
    "diagnosis": "Migraine",
    "prescription": "Ibuprofen",
    "is_deleted": 0,
    "patient": {
      "patient_id": "p005",
      "first_name": "David",
      "last_name": "Miller",
      "date_of_birth": ISODate("1978-06-17"),
      "gender": "Male",
      "contact_number": "(998)8776655",
      "address": "202 Cedar Drive, Seattle, WA 98101, USA",
      "email": "david@example.com",
      "emergency_contact_name": "Sarah Miller",
      "emergency_contact_number": "(556)6778899",
      "is_deleted": 0
    },
    "doctor": {
      "doctor_id": "doc003",
      "first_name": "Samuel",
      "last_name": "Thompson",
      "role": "Pediatrician",
      "contact_number": "(334)4556677",
      "email": "s.thompson@hospital.com",
      "available_days": ["Monday","Tuesday","Thursday","Friday"],
      "is_deleted": 0,
      "department": {
        "department_id": "dep003",
        "department_name": "Pediatrics",
        "is_deleted": 0
      }
    },
    "billing": {
      "bill_id": "b002",
      "total_amount": 150.74,
      "payment_status": "Pending",
      "is_deleted": 0,
      "medicines": [
        {
          "medicine_id": "m003",
          "medicine_name": "Aspirin",
          "quantity": 3,
          "unit_price": 8.0,
          "supplier": "PharmaWorld",
          "expiry_date": ISODate("2025-06-15"),
          "is_deleted": 0
        }
      ]
    }
  },
  {
    "appointment_id": "a008",
    "appointment_date": ISODate("2025-01-04"),
    "appointment_time": "12:15:00",
    "status": "Completed",
    "diagnosis": "Fracture",
    "prescription": "Omeprazole",
    "is_deleted": 0,
    "patient": {
      "patient_id": "p008",
      "first_name": "Bob",
      "last_name": "Williams",
      "date_of_birth": ISODate("1993-09-22"),
      "gender": "Male",
      "contact_number": "(213)0909091",
      "address": "289 Westlake Drive, Fairview, OH 44126",
      "email": "bobw93@example.com",
      "emergency_contact_name": "Sarah Williams",
      "emergency_contact_number": "(415)9823476",
      "is_deleted": 0
    },
    "doctor": {
      "doctor_id": "doc004",
      "first_name": "Pooja",
      "last_name": "Pandit",
      "role": "Orthopedician",
      "contact_number": "(445)5667788",
      "email": "pooja.pandit@hospital.com",
      "available_days": ["Wednesday","Friday"],
      "is_deleted": 0,
      "department": {
        "department_id": "dep004",
        "department_name": "Orthopedics",
        "is_deleted": 0
      }
    },
    "billing": {
      "bill_id": "b004",
      "total_amount": 25.0,
      "payment_status": "Pending",
      "is_deleted": 0,
      "medicines": [
        {
          "medicine_id": "m004",
          "medicine_name": "Metformin",
          "quantity": 2,
          "unit_price": 12.0,
          "supplier": "MediCorp",
          "expiry_date": ISODate("2026-03-20"),
          "is_deleted": 0
        }
      ]
    }
  }
]);
