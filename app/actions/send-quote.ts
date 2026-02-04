"use server"
import emailjs from '@emailjs/nodejs';

interface QuoteFormData {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

const RECIPIENT_EMAIL = "bhandariaawash1@gmail.com"

// Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = "service_whblhte"
const EMAILJS_TEMPLATE_ID = "template_vhqb5wv"
const EMAILJS_PUBLIC_KEY = "m9zEMwN0BWa9Oy09U"
const EMAILJS_PRIVATE_KEY = "KzrESnzNqPyh3ooJRrEx_"

export async function sendQuoteRequest(formData: QuoteFormData) {
  const { name, email, phone, service, message } = formData

  // Basic Validation
  if (!name || !email || !message) {
    return { success: false, error: "Please fill in all required fields" }
  }

  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name: name,
        from_email: email,
        phone: phone || "Not provided",
        service: service || "General",
        message: message,
        to_email: RECIPIENT_EMAIL,
      },
      {
        publicKey: EMAILJS_PUBLIC_KEY,
        privateKey: EMAILJS_PRIVATE_KEY,
      }
    )

    if (response.status === 200) {
      return { success: true }
    }
    
    throw new Error("EmailJS failed to send")
  } catch (error) {
    console.error("EmailJS Error:", error)
    return { 
      success: true, 
      fallback: true,
      mailtoLink: generateMailtoLink(formData)
    }
  }
}

function generateMailtoLink(formData: QuoteFormData): string {
  const { name, email, phone, service, message } = formData
  const subject = encodeURIComponent(`Quote Request from ${name}`)
  const body = encodeURIComponent(`Name: ${name}\nService: ${service}\nMessage: ${message}`)
  return `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`
}