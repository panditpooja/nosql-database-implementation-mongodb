/*NOTE: For all the find queries mentioned in this file, the output always include the “_id” field unless explicitly mentioned in the comment for each query. */

/* 1. Find patients whose first name starts with 'R'.
     Reasoning: Quickly identify patients like “Robert” who may need specialized outreach or follow-up based on alphabetical grouping. */
db.appointments.find(
  { "patient.first_name": { $regex: /^R/i } },
  { "patient.first_name": 1, "patient.last_name": 1, "patient.gender": 1 }
);

/* 2. Find appointments where billing includes a medicine with quantity > 1.
     Reasoning: Flag visits where multiple doses were prescribed, so billing or inventory teams can review high-consumption cases. */
db.appointments.find(
  { "billing.medicines": { $elemMatch: { quantity: { $gt: 1 } } } },
  { appointment_id: 1, "billing.medicines.$": 1 }
);

/* 3. Find all completed appointments for female patients.
     Reasoning: Prepare gender‑specific treatment statistics and ensure follow‑up care for completed female patient visits. */
db.appointments.find(
  { status: "Completed", "patient.gender": "Female" },
  { appointment_id: 1, "patient.first_name": 1, "patient.last_name": 1, status: 1 }
);

/* 4. Return appointment_ids and the medicine details for "Ibuprofen" prescriptions.
     Reasoning: Track usage of common analgesics for supply forecasting and monitoring potential over‑prescription. */
db.appointments.find(
  { "billing.medicines.medicine_name": "Ibuprofen" },
  { appointment_id: 1, "billing.medicines.$": 1 }
);

/* 5. Find appointments with status neither 'Completed' nor 'Cancelled'.
     Reasoning: Identify upcoming or in‑progress appointments requiring staff assignment or patient reminders. */
db.appointments.find(
  { $nor: [ { status: 'Completed' }, { status: 'Cancelled' } ] },
  { appointment_id: 1, status: 1 }
);

/* 6. Find appointments in the 'Neurology' department.
     Reasoning: Generate department‑specific workload reports and allocate neurologists effectively. */
db.appointments.find(
  { 'doctor.department.department_name': 'Neurology' },
  { appointment_id: 1, 'doctor.first_name': 1, 'doctor.last_name': 1, 'doctor.department': 1 }
);

/* 7. Find doctors who have never billed any medicines (i.e. appointments where billing.medicines is empty or missing).
     Reasoning: Spot practitioners whose consultations did not generate pharmacy orders, to review non‑medicinal treatments or billing gaps. */
db.appointments.find(
  { $or: [ { billing: null }, { "billing.medicines": { $exists: true, $size: 0 } } ] },
  { appointment_id: 1, "doctor.doctor_id": 1, "doctor.first_name": 1, "doctor.last_name": 1, billing: 1 }
);

/* 8. Find patients not named Alice or John.
     Reasoning: Exclude specific high‑profile patients from general announcements or bulk communications. */
db.appointments.find(
  { $nor: [ { "patient.first_name": "Alice" }, { "patient.first_name": "John" } ] },
  { "patient.first_name": 1 }
);


/* 9. Find all future appointments (after today). 
     Reasoning: Use a date comparison to surface upcoming visits. */
db.appointments.find(
  { appointment_date: { $gt: ISODate("2025-05-09") } },
  { appointment_id: 1, appointment_date: 1, appointment_time: 1 }
);

/* 10. Find patients who have more than one emergency contact method.
     Reasoning: Verify that critical patients have both primary and emergency contacts on file for safety protocols. */
db.appointments.find(
  { 
    "patient.contact_number": { $exists: true },
    "patient.emergency_contact_number": { $exists: true }
  },
  { "patient.patient_id": 1, "patient.contact_number": 1, "patient.emergency_contact_number": 1 }
);

/* 11. Find all appointments where total billing exceeds $100.
     Reasoning: Flag high‑value visits for financial auditing and insurance verification. Amount can be dependent on the hospital's criteria. 100 used here for illustrative purposes. */
db.appointments.find(
  { "billing.total_amount": { $gt: 100 } },
  { appointment_id: 1, "billing.total_amount": 1 }
);

/* 12. Find all appointments for doctors who are available on “Friday”.
     Reasoning: Plan staffing and room allocation for peak end-of-week clinic sessions. */
db.appointments.find(
  { "doctor.available_days": "Friday" },
  { appointment_id: 1, "doctor.doctor_id": 1, "doctor.available_days": 1 }
);

/* 13. Find appointments where the patient’s age at time of appointment was over 40 years.
     Reasoning: Identify middle-aged and senior patients for targeted health screening programs. */
db.appointments.find({
  $expr: {
    $gt: [
      { $divide: [
          { $subtract: [ "$appointment_date", "$patient.date_of_birth" ] },
          1000 * 60 * 60 * 24 * 365
      ]},
      40
    ]
  }
},
{ appointment_id: 1,
    "patient.first_name": 1,
    "patient.last_name": 1,
  "patient.date_of_birth": 1,
  appointment_date: 1
});

/* 14. Find patients living in “Seattle” (city substring in address).
     Reasoning: Locate regional patient segments for local health campaign planning. */
db.appointments.find(
  { "patient.address": { $regex: /Seattle/, $options: "i" } },
  { "patient.first_name": 1, "patient.last_name": 1, "patient.address": 1 }
);

/* 15. Find appointments for doctors who have never billed any medicines (i.e. appointments where billing.medicines is empty or missing).
     Reasoning: Spot practitioners whose consultations did not generate pharmacy orders, to review non‑medicinal treatments or billing gaps. */
db.appointments.find(
  { $or: [ { billing: null }, { "billing.medicines": { $exists: true, $size: 0 } } ] },
  { appointment_id: 1, "doctor.doctor_id": 1, "doctor.first_name": 1, "doctor.last_name": 1, billing: 1 }
);