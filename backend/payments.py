import razorpay
import os
from dotenv import load_dotenv

load_dotenv()

RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID", "rzp_test_placeholder")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET", "placeholder_secret")

client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

def create_razorpay_order(amount: int, currency: str = "INR"):
    data = {
        "amount": amount * 100,  # amount in the smallest currency unit (paise)
        "currency": currency,
        "receipt": "receipt_order_123"
    }
    order = client.order.create(data=data)
    return order

def verify_payment_signature(params_dict):
    return client.utility.verify_payment_signature(params_dict)
