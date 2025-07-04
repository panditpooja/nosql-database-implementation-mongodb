/*
  AGGREGATION PIPELINES
*/
/*NOTE: For all the find queries mentioned in this file, the output always include the “_id” field unless explicitly mentioned in the comment for each query. */

/* 1. Count the total number of appointments for each doctor.  */
/* Reasoning: Generate headcounts per physician to balance workloads and plan staffing. */
db.appointments.aggregate([
  { $match: { "doctor.doctor_id": { $exists: true } } },
  { $group: {
      _id:               "$doctor.doctor_id",
      doctor_name:       { $first: "$doctor.first_name" },
      totalAppointments: { $sum: 1 }
  }}
]);

/* 2. Group appointment records by patient and list all prescribed medicines. */
/* Reasoning: Consolidate each patient’s medication history for chart reviews and care coordination. */
db.appointments.aggregate([
  { $unwind: "$billing.medicines" },
  { $group: {
      _id:                  "$patient.patient_id",
      patient_name:         { $first: "$patient.first_name" },
      prescribed_medicines: { $push:  "$billing.medicines.medicine_name" }
  }}
]);

/* 3. Summarize paid bills: patient full name, medicine count, and total revenue. */
/* Reasoning: Reconcile revenue and track closed payments for financial audits. */
db.appointments.aggregate([
  { $match: { "billing.payment_status": "Paid" } },
  { $project: {
      patient_full_name: { $concat: ["$patient.first_name", " ", "$patient.last_name"] },
      med_count:         { $size:   { $ifNull: ["$billing.medicines", []] } },
      total_bill_amount: "$billing.total_amount"
  }}
]);

/* 4. Find the top 3 most prescribed medicines overall. */
/* Reasoning: Identify high‑demand drugs for procurement planning. */
db.appointments.aggregate([
  { $unwind: "$billing.medicines" },
  { $group: {
      _id: "$billing.medicines.medicine_name",
      prescriptionCount: { $sum: "$billing.medicines.quantity" }
  }},
  { $sort: { prescriptionCount: -1 } },
  { $limit: 3 }
]);

/* 5. Find all medicines expiring within the next 30 days for each appointment. */
/* Reasoning: Proactively flag soon‑to‑expire stock for pharmacy restocking and patient safety. */
/* Ideally the Hospital would run this query for 30 days but we didn't have a record that satisfies that condition and changing the data would make it inconsitent with previous projects. So we have changes the scenario for 60 days (2 months) */
db.appointments.aggregate([
  { $project: {
      appointment_id: 1,
      expiring_medicines: {
        $filter: {
          input: { $ifNull: ["$billing.medicines", []] },
          as: "med",
          cond: {
            $and: [
              { $gt: [ "$$med.expiry_date", ISODate() ] },
              { $lte: [ "$$med.expiry_date", { $add: [ ISODate(), 1000*60*60*24*60 ] } ] }
            ]
          }
        }
      }
  }}
]);

/* 6. Compute average number of medicines per appointment. */
/* Reasoning: Monitor prescription patterns to detect unusually low/high prescribing rates. */
db.appointments.aggregate([
  { $project: { medCount: { $size: { $ifNull: ["$billing.medicines", []] } } } },
  { $group: {
      _id: null,
      avgMedsPerAppointment: { $avg: "$medCount" }
  }}
]);

/* 7. Identify appointments with no medicines prescribed. */
/* Reasoning: Spot consults that resulted in non‑pharmacological treatments or potential data gaps. */
db.appointments.aggregate([
  { $match: { $or: [ { billing: null }, { "billing.medicines": { $size: 0 } } ] } },
  { $project: { appointment_id: 1, status: 1, billing: 1 } }
]);

/* 8. List distinct departments that have appointments scheduled. */
/* Reasoning: Provide a quick directory of active care units. */
db.appointments.aggregate([
  { $group: { _id: "$doctor.department.department_name" } },
  { $sort: { _id: 1 } }
]);

/* 9. Monthly appointment volume trend for the past year. */
/* Reasoning: Identify seasonal peaks and plan staffing/resources monthly. */
db.appointments.aggregate([
  { $match: { appointment_date: { $gte: ISODate("2024-05-01"), $lt: ISODate("2025-05-01") } } },
  { $group: {
      _id: { $dateToString: { format: "%Y-%m", date: "$appointment_date" } },
      count: { $sum: 1 }
  }},
  { $sort: { _id: 1 } }
]);

/* 10. Total revenue by department. */
/* Reasoning: Compare departmental revenue contributions to guide budget allocation. */
db.appointments.aggregate([
  { $match: { "billing.total_amount": { $exists: true } } },
  { $group: {
      _id: "$doctor.department.department_name",
      revenue: { $sum: "$billing.total_amount" }
  }},
  { $sort: { revenue: -1 } }
]);

/* 11. Top 5 patients by number of visits. */
/* Reasoning: Identify frequent visitors for care management and loyalty programs. */
db.appointments.aggregate([
  { $group: {
      _id: "$patient.patient_id",
      patient_name: { $first: { $concat: ["$patient.first_name", " ", "$patient.last_name"] } },
      visits: { $sum: 1 }
  }},
  { $sort: { visits: -1 } },
  { $limit: 5 }
]);

/* 12. Average billing amount per doctor. */
/* Reasoning: Evaluate physician billing patterns to detect anomalies or benchmark performance. */
db.appointments.aggregate([
  { $match: { "billing.total_amount": { $exists: true } } },
  { $group: {
      _id: "$doctor.doctor_id",
      doctor_name: { $first: "$doctor.first_name" },
      avgBilling: { $avg: "$billing.total_amount" }
  }},
  { $sort: { avgBilling: -1 } }
]);

/* 13. Departmental appointment distribution. */
/* Reasoning: Compare workload across departments for resource allocation. */
db.appointments.aggregate([
  { $group: {
      _id: "$doctor.department.department_name",
      count: { $sum: 1 }
  }},
  { $sort: { count: -1 } }
]);
