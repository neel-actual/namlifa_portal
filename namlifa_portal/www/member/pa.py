import frappe
import json

fields = [
  {
   "fieldname": "membership_no",
   "fieldtype": "Data",
   "label": "Membership No"
  },
  {
   "fieldname": "membership_expiry",
   "fieldtype": "Data",
   "label": "Membership Valid Till"
  },
  {
   "fieldname": "gpa_joined",
   "fieldtype": "Data",
   "label": "GPA Joined Since"
  },
  {
   "fieldname": "receipt_no",
   "fieldtype": "Data",
   "label": "Receipt No"
  },
  {
   "fieldname": "branch",
   "fieldtype": "Data",
   "label": "Branch"
  },
  {
   "fieldname": "full_name",
   "fieldtype": "Data",
   "label": "Name"
  },
  {
   "fieldname": "new_nric_no",
   "fieldtype": "Data",
   "label": "IC No"
  },
  {
   "fieldname": "relationship",
   "fieldtype": "Data",
   "label": "Relationship"
  },
  {
   "fieldname": "age",
   "fieldtype": "Data",
   "label": "Age"
  },
  {
   "fieldname": "occupation",
   "fieldtype": "Data",
   "label": "Occupation"
  },
  {
   "fieldname": "renewal_application",
   "fieldtype": "Data",
   "label": "Renewal/New Application"
  },
  {
   "fieldname": "sum_assured",
   "fieldtype": "Data",
   "label": "Sum Assured"
  },
  {
   "fieldname": "address",
   "fieldtype": "Data",
   "label": "Address"
  },
  {
   "fieldname": "postcode",
   "fieldtype": "Data",
   "label": "Postcode"
  },
  {
   "fieldname": "city",
   "fieldtype": "Data",
   "label": "City"
  },
  {
   "fieldname": "state",
   "fieldtype": "Data",
   "label": "State"
  },
  {
   "fieldname": "tel_o",
   "fieldtype": "Data",
   "label": "Tel No(O)"
  },
  {
   "fieldname": "tel_hp",
   "fieldtype": "Data",
   "label": "Tel H/P"
  },
  {
   "fieldname": "company",
   "fieldtype": "Data",
   "label": "Company"
  },
  {
   "fieldname": "email",
   "fieldtype": "Data",
   "label": "Email"
  },
  {
   "fieldname": "insurance_validity",
   "fieldtype": "Data",
   "label": "Period Of Insurance"
  },
  {
   "fieldname": "credit_card_no",
   "fieldtype": "Data",
   "label": "Credit Card No/Cheque No"
  },
  {
   "fieldname": "payment_mode",
   "fieldtype": "Data",
   "label": "Payment Mode"
  },
  {
   "fieldname": "bank",
   "fieldtype": "Data",
   "label": "Bank"
  },
  {
   "fieldname": "premium_sst",
   "fieldtype": "Data",
   "label": "Premium Exclude SST 6%"
  },
  {
   "fieldname": "total_premium",
   "fieldtype": "Data",
   "label": "Total Premium Include SST 6%"
  },
  {
   "fieldname": "premium",
   "fieldtype": "Data",
   "label": "Premium"
  },
  {
   "fieldname": "over_premium",
   "fieldtype": "Data",
   "label": "Over Premium"
  },
  {
   "fieldname": "auto_renewal",
   "fieldtype": "Data",
   "label": "Auto Renewal"
  },
  {
   "fieldname": "certificate_number",
   "fieldtype": "Data",
   "label": "Certificate Number"
  },
  {
   "fieldname": "nominee_one",
   "fieldtype": "Data",
   "label": "Nominee 1"
  },
  {
   "fieldname": "nominee_one_relationship",
   "fieldtype": "Data",
   "label": "Nominee Relationship 1"
  },
  {
   "fieldname": "nominee_one_ic_no",
   "fieldtype": "Data",
   "label": "Nominee's IC No 1"
  },
  {
   "fieldname": "nominee_one_share",
   "fieldtype": "Data",
   "label": "Share % 1"
  },
  {
   "fieldname": "nominee_two",
   "fieldtype": "Data",
   "label": "Nominee 2"
  },
  {
   "fieldname": "nominee_two_relationship",
   "fieldtype": "Data",
   "label": "Nominee Relationship 2"
  },
  {
   "fieldname": "nominee_two_ic_no",
   "fieldtype": "Data",
   "label": "Nominee's IC No 2"
  },
  {
   "fieldname": "nominee_two_share",
   "fieldtype": "Data",
   "label": "Share % 2"
  },
  {
   "fieldname": "nominee_three",
   "fieldtype": "Data",
   "label": "Nominee 3"
  },
  {
   "fieldname": "nominee_three_relationship",
   "fieldtype": "Data",
   "label": "Nominee Relationship 3"
  },
  {
   "fieldname": "nominee_three_ic_no",
   "fieldtype": "Data",
   "label": "Nominee's IC No 3"
  },
  {
   "fieldname": "nominee_three_share",
   "fieldtype": "Data",
   "label": "Share % 3"
  }
 ]

def get_context(context):
    pa = frappe.db.get_value("Namlifa PA", {"email": frappe.session.user}, "*")
    context.user = frappe.session.user
    context.user_doc = frappe.session
    context.csrf_token = frappe.sessions.get_csrf_token()
    context.fields = fields
    context.pa = pa

    return context