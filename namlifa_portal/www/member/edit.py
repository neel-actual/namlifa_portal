import frappe
import json

def get_context(context):
    if frappe.session.user == 'Guest':
        frappe.local.flags.redirect_location = '/'
        raise frappe.Redirect

    member = frappe.db.get_value("Namlifa Member", {"email": frappe.session.user}, "*")

    context.member = member
    return context